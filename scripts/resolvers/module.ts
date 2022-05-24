import { DeclarationReflection, ReferenceReflection } from "typedoc";
import { AngularDecorator, AngularModuleDecoratorArguments } from "../converters";
import { AngularResolvedProvider } from "../util";
import { resolveAngularTypeArray, resolveProviders } from "./util";

export function resolveNgModuleDecoratorArguments(
  decorator: AngularDecorator<AngularModuleDecoratorArguments>,
  reflection: DeclarationReflection
): AngularDecorator<AngularModuleResolvedDecoratorArguments> {
  const resolvedArguments: any = decorator.arguments;

  resolvedArguments.declarations = resolveAngularTypeArray(
    decorator.arguments.declarations, 
    reflection
  );

  resolvedArguments.imports = resolveAngularTypeArray(
    decorator.arguments.imports, 
    reflection
  );

  resolvedArguments.exports = resolveAngularTypeArray(
    decorator.arguments.exports, 
    reflection
  );

  resolvedArguments.bootstrap = resolveAngularTypeArray(
    decorator.arguments.bootstrap, 
    reflection
  );

  resolvedArguments.providers = resolveProviders(
    decorator.arguments.providers, 
    reflection
  );

  return new AngularDecorator<AngularModuleResolvedDecoratorArguments>(
    decorator.name,
    resolvedArguments,
    decorator.type
  );
}


export interface AngularModuleResolvedDecoratorArguments {
  changeDetection?: string;
  viewProviders: Array<AngularResolvedProvider>;
  providers: Array<AngularResolvedProvider>;
  declarations: Array<ReferenceReflection>;
  imports: Array<ReferenceReflection>;
  exports: Array<ReferenceReflection>;
  bootstrap: Array<ReferenceReflection>;
  schemas: Array<any>;
  id?: string;
  jit?: string;
}