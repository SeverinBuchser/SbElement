import {
  apply,
  applyTemplates,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  noop, Rule,
  Tree,
  url} from '@angular-devkit/schematics';
import { Schema, validate } from './schema';
import { readFileSync } from 'fs';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { join, resolve, strings } from '@angular-devkit/core';
import { buildRelativePath } from '@schematics/angular/utility/find-module';
import { DocConfig } from './doc-config';
import { AngularProject } from './angular-project';

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

export default function(options: Partial<Schema>): Rule {
  if (!validate(options)) return noop();
  return async (host: Tree) => {

    const workspace = await getWorkspace(host);

    if (!host.exists(options.docConfig)) {
      throw new Error(`The doc config file at "${options.docConfig}" does not exist`);
    }
    if (!host.getDir(options.path)) {
      throw new Error(`The path "${options.path}" does not exist`);
    }
    if (!workspace.projects.has(options.project)) {
      throw new Error(`The project "${options.project}" does not exist`);
    }

    const docConfig = new DocConfig(host, options.docConfig);
    const ngProject = new AngularProject({
      tsConfigFilePath: docConfig.tsConfig
    }); 
    
    console.log(ngProject.getAngularModules().map(ngModule => ngModule.getName()))

    // buildDocReference(options.doc);    
  };
}

// function buildDocReference(doc: string): {
//   entryModules: Container<AngularModule>, 
//   modules: Container<AngularModule>, 
//   declarables: Container<AngularDeclarable>
// } {
//   const docData: any = JSON.parse(readFileSync(doc).toString());
//   const declarables = buildDeclarables(docData);
//   const modules = buildModules(docData.modules);
//   const entryModules = findEntryModules(modules);

//   entryModules.forEach(entryModule => referenceModule(entryModule, modules, declarables));
//   console.log(modules[0].generateSignature())
//   return {
//     entryModules,
//     modules,
//     declarables
//   }
// }

// function buildModules(modulesData: Array<any>): Container<AngularModule> {
//   const modules = new Container<AngularModule>();
//   modulesData.forEach((moduleData: any) => {
//     modules.push(AngularModule.build(moduleData));
//   })
//   return modules;
// }

// function referenceModule(
//   module: AngularModule, 
//   modules: Container<AngularModule>, 
//   declarables: Container<AngularDeclarable>
// ) {
//   module.getChildrenByType('declarations').forEach(declaration => {
//     module.addDeclaration(declarables.findByName(declaration)!);
//   });

//   module.getChildrenByType('exports').forEach(exportData => {
//     const exportt = declarables.findByName(exportData);
//     if (exportt) {
//       module.addExport(exportt)
//     } else {
//       const exportModule = modules.findByName(exportData)!;
//       module.addExport(exportModule)
//       referenceModule(exportModule, modules, declarables);
//     }
//   });
// }

// function buildDeclarables(docData: any): Container<AngularDeclarable> {
//   const declarables = new Container<AngularDeclarable>();

//   // docData.pipes.forEach((pipeData: any) => {
//   //   console.log(pipeData)
//   // })

//   docData.directives.forEach((directiveData: any) => {
//     declarables.push(AngularDirective.build(directiveData));
//   })

//   docData.components.forEach((componentData: any) => {  
//     declarables.push(AngularComponent.build(componentData));
//   })
//   return declarables;
// }

// function findEntryModules(modules: Container<AngularModule>): Container<AngularModule> {
//   const entryModules = new Container<AngularModule>();

//   modules.forEach((moduleOne: AngularModule) => {
//     if (modules.every((moduleTwo: AngularModule) => {
//       return !moduleTwo.getChildrenByType('exports').includes(moduleOne.name);
//     })) {
//       entryModules.push(moduleOne)
//     }
//   })

//   return entryModules;
// }



// export function docs(options: Partial<Schema>): Rule {
//   if (!validate(options)) return noop();
//   return async (host: Tree) => {
//     const workspace = await getWorkspace(host);

//     if (!host.exists(options.docConfig)) {
//       throw new Error(`The doc config file at "${options.docConfig}" does not exist`);
//     }
//     if (!host.getDir(options.path)) {
//       throw new Error(`The path "${options.path}" does not exist`);
//     }
//     if (!workspace.projects.has(options.project)) {
//       throw new Error(`The project "${options.project}" does not exist`);
//     }

//     // const docRules = applyModuleDocs();
    

//     const docsSource = apply(url('./files/docs'), [
//       applyTemplates({
//         ...strings//,
//         // ...generatorHelper.get()
//       }),
//       move(options.path)
//     ])

//     return chain([
//       // docRules,
//       mergeWith(docsSource, MergeStrategy.Overwrite)
//     ])
//   };
// }

// function applyModuleDocs(): Rule {
//   const rules: Array<Rule> = new Array();

//   reflections.filter(isAngularModuleReflection).forEach((reflection: AngularModuleReflection) => {
//     const doc = applyModuleDoc(reflection, config, options.path);
//     if (doc) {
//       generatorHelper.add(
//         strings.classify(reflection.name) + 'DocComponent',
//         `./${strings.dasherize(reflection.name)}`,
//         strings.dasherize(reflection.name)
//       );
//       rules.push(doc)
//     }
//   })  
    
//   return chain(rules)
// }


// function applyModuleDoc(
//   reflection: AngularModuleReflection,
//   config: DocConfig,
//   path: string
// ): Rule | undefined {
//   const exampleConfig = config.examples.get(reflection.name);

//   if (exampleConfig) {
//     const docDirName = strings.dasherize(reflection.name);
//     const docTempPath = resolve(join(path, docDirName, "necessary.any"));
//     const absExampleComponentPath = resolve(exampleConfig.path);
//     return mergeWith(apply(url('./files/doc'), [
//       applyTemplates({
//         ...strings,
//         name: reflection.name,
//         exampleComponent: exampleConfig.component,
//         exampleComponentPath: buildRelativePath(docTempPath, absExampleComponentPath),
//         docObject: ""
//       }),
//       move(path)
//     ]), MergeStrategy.Overwrite)
//   }
//   return;
// }