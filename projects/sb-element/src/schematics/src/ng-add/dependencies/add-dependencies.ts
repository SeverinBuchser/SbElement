import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addPackageJsonDependency } from 'schematics-utilities';
import { dependencies } from './dependencies';

export function addDependencies(): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    dependencies.forEach(dependency => {
      addPackageJsonDependency(_tree, dependency);
      _context.logger.info(`Added "${dependency.name}" into ${dependency.type}`)
    });

    return _tree;
  };
}
