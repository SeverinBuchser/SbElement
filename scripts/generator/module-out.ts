import { Application, DeclarationReflection, ProjectReflection, ReferenceReflection } from "typedoc";
import { getExports, Node, Tree } from "../util";

export function generateModuleOut(
  project: ProjectReflection, 
  moduleTrees: Array<Tree<DeclarationReflection>>,
  app: Application
): Array<any> {
  moduleTrees.forEach(tree => tree.traverse((
    reflection: DeclarationReflection, 
    node: Node<DeclarationReflection>
  ) => {
    getExports(reflection)?.forEach(exportt => {
      app.serializer.toObject(reflection);
      if (reflection.decorators) {
        reflection.decorators.forEach((decorator => {
          
        }))
      }
    })
  }))
  return new Array();
}


export function generateComponentOut(
  reflection: ReferenceReflection
): any {

}