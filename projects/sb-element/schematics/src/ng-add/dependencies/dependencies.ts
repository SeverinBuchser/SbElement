import { NodeDependency, NodeDependencyType } from 'schematics-utilities';

export const dependencies: Array<NodeDependency> = [
  { type: NodeDependencyType.Dev, version: 'latest', name: 'sb-theming' }
];
