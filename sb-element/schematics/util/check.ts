import { SchematicsException, Tree } from "@angular-devkit/schematics";
import { workspaces } from '@angular-devkit/core';

import { ComponentSchema } from "./component-schema";
import { createHost } from "./create-host";



export async function checkComponent<SchemaType extends ComponentSchema, CheckedSchemaType extends SchemaType>(tree: Tree, options: SchemaType): Promise<CheckedSchemaType> {
  const host = createHost(tree);
  const { workspace } = await workspaces.readWorkspace('/', host);

  if (!options.project && typeof workspace.extensions.defaultProject === 'string') {
    options.project = workspace.extensions.defaultProject;
  }

  const project = (options.project != null) ? workspace.projects.get(options.project) : null;
  if (!project) {
    throw new SchematicsException(`Invalid project name: ${options.project}`);
  }

  const projectType = project.extensions.projectType === 'application' ? 'app' : 'lib';

  if (options.path === undefined) {
    options.path = `${project.sourceRoot}/${projectType}`;
  }

  return options as CheckedSchemaType;
}
