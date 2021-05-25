import { chain, noop, Rule } from '@angular-devkit/schematics';
import { addDependencies, installDependencies } from './dependencies';
import { addStyles } from './styles';

export function ngAdd(_options: any): Rule {
  return chain([
    _options && _options.skipPackageJson ? noop() : addDependencies(),
    _options && _options.skipPackageJson ? noop() : installDependencies(),
    _options && _options.skipPackageJson ? noop() : addStyles(_options)
  ]);
}
