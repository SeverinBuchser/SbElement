import { NodeDependency, NodeDependencyType } from 'schematics-utilities';

export const dependencies: Array<NodeDependency> = [
  { type: NodeDependencyType.Default, version: '0.0.5', name: 'sb-theming' }
];
