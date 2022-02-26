import {
  Rule, Tree, apply, url, applyTemplates, move,
  chain, mergeWith, externalSchematic, MergeStrategy, SchematicsException
} from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';

import { Schema as StyleableComponentSchema, CheckedSchema as CheckedStyleableComponentSchema } from './schema';
import { checkComponent, extractComponentOptions } from "../util";import { join, normalize } from "path";

export function styleableComponent(options: StyleableComponentSchema): Rule {
  return async (tree: Tree) => {
    const checkedOptions: CheckedStyleableComponentSchema = await checkComponent(tree, options);

    var directive = 'ClassNameInputDirective';

    if (checkedOptions.sizing && checkedOptions.theming && checkedOptions.coloring) {
      directive = 'SizeThemeColorInputDirective';
    } else if (checkedOptions.sizing && checkedOptions.theming) {
      directive = 'SizeThemeInputDirective';
    } else if (checkedOptions.theming && checkedOptions.coloring) {
      directive = 'ThemeColorInputDirective';
    } else if (checkedOptions.sizing) {
      directive = 'SizeInputDirective';
    } else if (checkedOptions.theming) {
      directive = 'ThemeInputDirective';
    } else if (!checkedOptions.theming && checkedOptions.coloring) {
      throw new SchematicsException(`Cannot have coloring only!`);
    }

    var constructor = 'constructor() {\n\t\tsuper()\n\t}';
    var themeService = '';
    if (checkedOptions.theming) {
      constructor = 'constructor(themeService: ThemeService) {\n\t\tsuper(themeService);\n\t}';
      themeService = 'ThemeService, ';
    }

    const templateSource = apply(url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: checkedOptions.name,
        directive: directive,
        constructor: constructor,
        themeService: themeService
      }),
      move(normalize(join((checkedOptions.path as string), strings.dasherize(checkedOptions.name))))
    ]);

    return chain([
      externalSchematic('@schematics/angular', 'component', extractComponentOptions(checkedOptions)),
      mergeWith(templateSource, MergeStrategy.Overwrite)
    ]);
  }
}
