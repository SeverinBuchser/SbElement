import {
  apply,
  applyTemplates,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicsException,
  Tree,
  url } from '@angular-devkit/schematics';
import {
  dirname,
  normalize,
  join,
  strings,
  relative,
  Path } from '@angular-devkit/core';

import { Schema } from './schema';
import { sbStrings } from '../util';
import { buildDefaultPath, getWorkspace } from '@schematics/angular/utility/workspace';
import { parseName } from '@schematics/angular/utility/parse-name';
import { buildRelativePath, findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { read } from '../util/read';
import { applyToUpdateRecorder, InsertChange } from '@schematics/angular/utility/change';
import { addDeclarationToModule, addExportToModule } from '@schematics/angular/utility/ast-utils';
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';

const CORE_DIR = 'core';
const STYLE_MODULE = '_module.scss';
const THEME_MODULE = '_module.theme.scss';

const TOP_LEVEL_STYLE_MODULE = 'sb-element.scss';
const TOP_LEVEL_THEME_MODULE = 'sb-element.theme.scss';

function addDeclarationToNgModule(options: Schema): Rule {
  return (host: Tree) => {
    const modulePath = options.module;
    if (!modulePath) {
      throw new SchematicsException("There is no module to declare the style files in!");
    }

    const sourceText = read(host, modulePath);
    const source = ts.createSourceFile(
      modulePath,
      sourceText,
      ts.ScriptTarget.Latest,
      true
    );

    const componentPath =
      `/${options.path}/` +
      (options.flat ? '' : strings.dasherize(options.name) + '/') +
      strings.dasherize(options.name) + '.component';
    const relativePath = buildRelativePath(modulePath, componentPath);
    const classifiedName = sbStrings.sbComponentify(options.name);
    const declarationChanges = addDeclarationToModule(
      source,
      modulePath,
      classifiedName,
      relativePath,
    );

    const declarationRecorder = host.beginUpdate(modulePath);
    for (const change of declarationChanges) {
      if (change instanceof InsertChange) {
        declarationRecorder.insertLeft(change.pos, change.toAdd);
      }
    }
    host.commitUpdate(declarationRecorder);

    if (options.export) {
      const sourceText = read(host, modulePath);
      const source = ts.createSourceFile(
        modulePath,
        sourceText,
        ts.ScriptTarget.Latest,
        true
      );

      const exportRecorder = host.beginUpdate(modulePath);
      const exportChanges = addExportToModule(
        source,
        modulePath,
        classifiedName,
        relativePath,
      );

      for (const change of exportChanges) {
        if (change instanceof InsertChange) {
          exportRecorder.insertLeft(change.pos, change.toAdd);
        }
      }
      host.commitUpdate(exportRecorder);
    }

    return host;
  };
}

function addDeclarationToStyleModules(options: Schema): Rule {
  return (host: Tree) => {
    const path = options.path;
    const modulePath = options.module;
    if (!modulePath) {
      throw new SchematicsException("There is no module to declare the style files in!");
    }
    const moduleDir = dirname(modulePath as Path);

    let styleModulePath = join(moduleDir, STYLE_MODULE);
    let themeModulePath = join(moduleDir, THEME_MODULE);

    if (!host.exists(styleModulePath)) {
      styleModulePath = join(moduleDir, TOP_LEVEL_STYLE_MODULE);
    }
    if (!host.exists(themeModulePath)) {
      themeModulePath = join(moduleDir, TOP_LEVEL_THEME_MODULE);
    }

    if (!host.exists(styleModulePath)) {
      throw new SchematicsException("There is no style module!")
    }
    if (!host.exists(themeModulePath)) {
      throw new SchematicsException("There is no theme module!")
    }

    const styleModuleText = read(host, styleModulePath);
    const themeModuleText = read(host, themeModulePath);

    let styleUsePos = styleModuleText.length;
    let themeUsePos = themeModuleText.length;
    let themeIncludePos = themeModuleText.length;

    const basePath =
      `/${path}/` +
      (options.flat ? '' : strings.dasherize(options.name) + '/') +
      strings.dasherize(options.name);
    const stylePath = basePath + '.component';
    const themePath = basePath + '.component.theme';

    const relativeStylePath = normalize(buildRelativePath(styleModulePath, stylePath));
    const relativeThemePath = normalize(buildRelativePath(themeModulePath, themePath));

    let styleUse = `@use \'${relativeStylePath}\';\n`;
    let themeUse = `@use \'${relativeThemePath}\';\n`;
    let themeInclude = `@include ${strings.dasherize(options.name)}.theme(`;

    let useRegexp = /@use (?:'.*'|".*").*?;(?!\n@use)(\n)?/;
    let includeRegexp = /\n(\s*)@include .*\.theme\((.*)\);(?!\n\s*@include)(\n)?/;

    let styleUseMatch = useRegexp.exec(styleModuleText);
    if (styleUseMatch) {
      styleUsePos = styleUseMatch.index + styleUseMatch[0].length;
      let hasNewLine = styleUseMatch[1];
      if (!hasNewLine) {
        styleUse = '\n' + styleUse;
      }
    }

    let themeUseMatch = useRegexp.exec(themeModuleText);
    if (themeUseMatch) {
      themeUsePos = themeUseMatch.index + themeUseMatch[0].length;
      let hasNewLine = themeUseMatch[1];
      if (!hasNewLine) {
        themeUse = '\n' + themeUse;
      }
    }

    let themeIncludeMatch = includeRegexp.exec(themeModuleText);
    if (themeIncludeMatch) {
      themeIncludePos = themeIncludeMatch.index + themeIncludeMatch[0].length;
      let inset = themeIncludeMatch[1];
      if (inset) {
        themeInclude = inset + themeInclude;
      }
      let hasNewLine = themeIncludeMatch[3];
      if (!hasNewLine) {
        themeInclude = '\n' + themeInclude;
      }
      let $theme = themeIncludeMatch[2];
      if ($theme) {
        themeInclude += $theme;
      }
    }
    themeInclude += ');\n'

    const styleUseChange = new InsertChange(
      styleModulePath,
      styleUsePos,
      styleUse
    );
    const themeUseChange = new InsertChange(
      themeModulePath,
      themeUsePos,
      themeUse
    );
    const themeIncludeChange = new InsertChange(
      themeModulePath,
      themeIncludePos,
      themeInclude
    );

    const styleModuleRecorder = host.beginUpdate(styleModulePath);
    const themeModuleRecorder = host.beginUpdate(themeModulePath);
    applyToUpdateRecorder(styleModuleRecorder, [styleUseChange]);
    applyToUpdateRecorder(themeModuleRecorder, [themeUseChange, themeIncludeChange]);

    host.commitUpdate(styleModuleRecorder);
    host.commitUpdate(themeModuleRecorder);

    return host;
  };
}


export function sbComponent(options: Schema): Rule {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);

    const project = workspace.projects.get(options.project as string);
  	if (!project) {
      throw new SchematicsException(`Project "${options.project}" does not exist.`);
    }

  	if (options.path === undefined) {
      options.path = buildDefaultPath(project);
    }

    const parsedPath = parseName(options.path as string, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    options.module = findModuleFromOptions(host, options);

    let corePath = join(buildDefaultPath(project) as Path, CORE_DIR);
    corePath = relative(options.path as Path, corePath);

    const templateSource = apply(url('./files'), [
      applyTemplates({
        ...strings,
        ...sbStrings,
        'if-flat': (s: string) => (options.flat ? '' : s),
        ...options,
        corePath: options.flat ? corePath : `../${corePath}`
      }),
      move(options.path)
    ]);

    return chain([
      addDeclarationToNgModule(options),
      addDeclarationToStyleModules(options),
      mergeWith(templateSource, MergeStrategy.Overwrite)
    ]);
  };
}
