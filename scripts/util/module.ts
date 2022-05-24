import { DeclarationReflection, Decorator, ReferenceType, Reflection } from "typedoc";

export function isModule<T extends Reflection>(reflection?: T): boolean {
  return getModuleDecorator(reflection) ? true : false;
}

function getModuleDecorator<T extends Reflection>(reflection?: T): Decorator | undefined {
  return reflection?.decorators?.find((decorator: Decorator) => {
    return decorator.name == 'NgModule';
  });
}

export function hasExports(module: DeclarationReflection): boolean {
  return getExports(module) ? true : false;
}

export function getExports(module: Reflection): Array<ReferenceType> | undefined {
  return getModuleDecorator(module)?.arguments?.exports;
}

export function forEachExport(
  module: Reflection,
  callback: (referenceType: ReferenceType) => void
): void {
  getExports(module)?.forEach((referenceType: ReferenceType) => {
    callback(referenceType);
  })
}