import { AngularDirectiveDecoratorArguments, AngularDecorator } from "../converters";
import { DeclarationReflection } from "typedoc";
import { AngularHost, AngularQueries, AngularResolvedIO, AngularResolvedProvider } from "../util";
import { resolveIO, resolveProviders } from "./util";

export function resolveDirectiveDecoratorArguments(
  decorator: AngularDecorator<AngularDirectiveDecoratorArguments>,
  reflection: DeclarationReflection
): AngularDecorator<AngularDirectiveResolvedDecoratorArguments> {
  const resolvedArguments: any = decorator.arguments;

  resolvedArguments.inputs = resolveIO(
    decorator.arguments.inputs,
    reflection
  );

  resolvedArguments.outputs = resolveIO(
    decorator.arguments.outputs, 
    reflection, 
  );

  resolvedArguments.providers = resolveProviders(
    decorator.arguments.providers, 
    reflection
  );
  
  return new AngularDecorator<AngularDirectiveResolvedDecoratorArguments>(
    decorator.name, 
    resolvedArguments,
    decorator.type
  );
}

export interface AngularDirectiveResolvedDecoratorArguments {
  selector?: string;
  inputs: Array<AngularResolvedIO>;
  outputs: Array<AngularResolvedIO>;
  providers: Array<AngularResolvedProvider>;
  exportAs?: string;
  queries?: AngularQueries;
  host?: AngularHost;
  jit?: string;
}