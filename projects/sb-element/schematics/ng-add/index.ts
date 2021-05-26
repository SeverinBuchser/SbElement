import { chain, noop, Rule } from '@angular-devkit/schematics';
import { addDependencies, installDependencies } from './dependencies';
import { Schema } from './schema';
import { addStyles } from './styles';

export function ngAdd(_options: Schema): Rule {
  return chain([
    !_options ? noop() : addDependencies(),
    !_options ? noop() : installDependencies(),
    !_options ? noop() : addStyles(_options)
  ]);
}
