import { AngularComponentDecoratorArguments, AngularDecorator } from "../converters";
import { DeclarationReflection } from "typedoc";
import { AngularResolvedProvider } from "../util";
import { resolveIO, resolveProviders } from "./util";
import { AngularDirectiveResolvedDecoratorArguments } from "./directive";

export function resolveComponentDecoratorArguments(
  decorator: AngularDecorator<AngularComponentDecoratorArguments>,
  reflection: DeclarationReflection
): AngularDecorator<AngularComponentResolvedDecoratorArguments> {
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

  resolvedArguments.viewProviders = resolveProviders(
    decorator.arguments.viewProviders, 
    reflection
  );
  
  return new AngularDecorator<AngularComponentResolvedDecoratorArguments>(
    decorator.name, 
    resolvedArguments,
    decorator.type
  );
}

export interface AngularComponentResolvedDecoratorArguments 
  extends AngularDirectiveResolvedDecoratorArguments {
  changeDetection?: string;
  viewProviders: Array<AngularResolvedProvider>;
  moduleId?: string;
  templateUrl?: string;
  template?: string;
  styleUrls: Array<string>;
  styles: Array<string>;
  animations: Array<string>;
  encapsulation?: string;
  interpolation?: [string, string];
  preserveWhitespaces?: string;
}