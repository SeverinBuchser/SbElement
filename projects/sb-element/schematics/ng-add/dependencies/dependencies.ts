import { NodeDependency, NodeDependencyType } from 'schematics-utilities';

export const dependencies: Array<NodeDependency> = [
  { type: NodeDependencyType.Default, version: '~1.0.4', name: 'sb-element' },
  { type: NodeDependencyType.Default, version: '~1.0.0', name: 'sb-theming' }
];
