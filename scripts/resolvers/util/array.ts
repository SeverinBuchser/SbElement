import {
  DeclarationReflection, ReferenceReflection
} from "typedoc";

export function resolveAngularTypeArray(
  array: Array<string>,
  reflection: DeclarationReflection
): Array<ReferenceReflection> {
  return array.map((typeName: string) => {
    return new ReferenceReflection(
      typeName, 
      reflection.findReflectionByName(typeName)!, 
      reflection
    );
  });
}