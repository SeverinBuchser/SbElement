import { strings } from '@angular-devkit/core';
import {
  apply,
  applyTemplates, chain, MergeStrategy,
  mergeWith,
  move, noop, Rule,
  Tree,
  url
} from '@angular-devkit/schematics';
import { buildRelativePath } from '@schematics/angular/utility/find-module';

import { getWorkspace } from '@schematics/angular/utility/workspace';
import { join, resolve } from 'path';
import { DocConfig, DocReader, SbDocGenerator } from 'sb-doc-generator';
import { AngularModuleReflection, isAngularModuleReflection, ReflectionRegister } from 'sb-doc-generator/dist/reflection';
import { ComponentList } from './component-list';
import { GeneratorHelper } from './generator-helper';
import { Importer } from './import-generator';
import { Router } from './route-generator';
import { Schema, validate } from './schema';

/**
 * Directory structure:
 * - doc:
 *  - {moduleName@dasherized}:
 *    - {moduleName@dasherized}-doc.component.html
 *    - {moduleName@dasherized}-doc.component.ts
 *    - index.ts
 *  - doc-core:
 *    - doc-core.module.ts
 *    - index.ts
 *    - module-doc.html
 *    - module-doc.scss
 *    - module-doc.ts
 *  - doc-route.pipe.ts
 *  - doc-routing.ts
 *  - doc.component.html
 *  - doc.component.scss
 *  - doc.component.ts
 *  - doc.module.ts
 *  - index.ts
 */

export function docs(options: Partial<Schema>): Rule {
  if (!validate(options)) return noop();
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);

    if (!host.exists(options.docConfigFile)) {
      throw new Error(`The doc config file at "${options.docConfigFile}" does not exist`);
    }
    if (!host.getDir(options.path)) {
      throw new Error(`The path "${options.path}" does not exist`);
    }
    if (!workspace.projects.has(options.project)) {
      throw new Error(`The project "${options.project}" does not exist`);
    }
    
    // const project = workspace.projects.get(options.project)!;
    // const projectPath = buildDefaultPath(project);
    const config = new DocReader().read(options.docConfigFile);
    const generator = new SbDocGenerator(config);
    
    const reflections = generator.convert();

    const componentList = new ComponentList(2, [], false);
    const importer = new Importer();
    const router = new Router(1, [], false);

    const generatorHelper = new GeneratorHelper(
      componentList,
      importer,
      router
    );

    const docRules = applyModuleDocs(reflections, config, options, generatorHelper);
    

    const docsSource = apply(url('./files/docs'), [
      applyTemplates({
        ...strings,
        ...generatorHelper.get()
      }),
      move(options.path)
    ])

    return chain([
      docRules,
      mergeWith(docsSource, MergeStrategy.Overwrite)
    ])
  };
}

function applyModuleDocs(
  reflections: ReflectionRegister,
  config: DocConfig,
  options: Schema,
  generatorHelper: GeneratorHelper
): Rule {
  const rules: Array<Rule> = new Array();

  reflections.filter(isAngularModuleReflection).forEach((reflection: AngularModuleReflection) => {
    const doc = applyModuleDoc(reflection, config, options.path);
    if (doc) {
      generatorHelper.add(
        strings.classify(reflection.name) + 'DocComponent',
        `./${strings.dasherize(reflection.name)}`,
        strings.dasherize(reflection.name)
      );
      rules.push(doc)
    }
  })  
    
  return chain(rules)
}


function applyModuleDoc(
  reflection: AngularModuleReflection,
  config: DocConfig,
  path: string
): Rule | undefined {
  const exampleConfig = config.examples.get(reflection.name);

  if (exampleConfig) {
    const docDirName = strings.dasherize(reflection.name);
    const docTempPath = resolve(join(path, docDirName, "necessary.any"));
    const absExampleComponentPath = resolve(exampleConfig.path);
    return mergeWith(apply(url('./files/doc'), [
      applyTemplates({
        ...strings,
        name: reflection.name,
        exampleComponent: exampleConfig.component,
        exampleComponentPath: buildRelativePath(docTempPath, absExampleComponentPath),
        docObject: ""
      }),
      move(path)
    ]), MergeStrategy.Overwrite)
  }
  return;
}