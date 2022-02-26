import {
  Rule, Tree, apply, url, applyTemplates, move,
  chain, mergeWith, externalSchematic, MergeStrategy
} from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';

import { Schema as PopperComponentSchema, CheckedSchema as CheckedPopperComponentSchema } from './schema';
import { checkComponent, extractComponentOptions } from "../util";
import { join, normalize } from "path";

export function popperComponent(options: PopperComponentSchema): Rule {
  return async (tree: Tree) => {
    const checkedOptions: CheckedPopperComponentSchema = await checkComponent(tree, options);


    const templateSource = apply(url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: checkedOptions.name
      }),
      move(normalize(join((checkedOptions.path as string), strings.dasherize(checkedOptions.name))))
    ]);

    return chain([
      externalSchematic('@schematics/angular', 'component', extractComponentOptions(checkedOptions)),
      mergeWith(templateSource, MergeStrategy.Overwrite)
    ]);
  }
}
