import { 
  DeclarationReflection, 
  ProjectReflection, 
  ReferenceType, 
  Reflection 
} from "typedoc";
import { forEachExport, getExports, isModule, Node, Tree } from "../util";

export function generateModuleTrees(
  project: ProjectReflection
): Array<Tree<DeclarationReflection>> {
  const roots = findRootModules(project);
  const trees = roots.map(root => new Tree(root));

  trees.forEach((tree: Tree<DeclarationReflection>) => {
    traverseExports(tree.root.data, project, tree.root, (
      reflection: DeclarationReflection, 
      node: Node<DeclarationReflection>
    ) => {
      return node.addChild(reflection);
    })
  })
  return trees;
}

function findRootModules(project: ProjectReflection): Array<DeclarationReflection> {
  if (project.children) {
    const modules = project.children.filter(child => isModule(child))
    return modules.filter((parent: DeclarationReflection) => {
      return modules.every((child: DeclarationReflection) => {
        return isNotExportInModule(parent, child);
      });
    });
  }

  return new Array();
}

function isNotExportInModule(
  reflection: Reflection,
  module: Reflection
): boolean {  
  const exports = getExports(module);
  if (!exports) return true;
  
  return exports.every((exportt: ReferenceType) => {
    return exportt.name != reflection.name;
  });
}

function traverseExports<T>(
  start: Reflection,
  project: ProjectReflection,
  data: T,
  callback: (reflection: DeclarationReflection, data: T) => T
): void {
  forEachExport(start, (referenceType: ReferenceType) => {
    const reflection = project.findReflectionByName(referenceType.name);
    if (isModule(reflection)) {
      traverseExports(
        reflection as DeclarationReflection,
        project, 
        callback(reflection as DeclarationReflection, data), 
        callback
      );
    }
  })
}