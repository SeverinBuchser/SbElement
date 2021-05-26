import { SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { getWorkspace, WorkspaceProject } from 'schematics-utilities';
import { Schema } from '../schema';
import { addToStyleProcessorOptions } from './add-to-style-processor-options';
import { addToStyles } from './add-to-styles';

export function addStyles(_options: Schema) {
  return (_tree: Tree, _context: SchematicContext) => {
    const workspace = getWorkspace(_tree);
    if (!workspace) {
      throw new SchematicsException("Not an Angular CLI workspace! Workspace configuration not found!");
    }

    let project: WorkspaceProject;
    if (_options.project) {
      project = workspace.projects[_options.project];
    } else {
      project = workspace.projects[Object.keys(workspace.projects)[0]];
    }

    if (!project) {
      throw new SchematicsException("No Project exists yet!");
    } else if (project.projectType === 'library') {
      throw new SchematicsException("Cannot add styles to a library!");
    }

    if (_options.customize) addToStyleProcessorOptions(project, _tree, _context);
    else addToStyles(project, _tree, _context);
    return _tree;
  };
}
