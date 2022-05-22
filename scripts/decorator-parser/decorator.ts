import { parseObjectString } from "./parse-object";

export enum AngularDecoratorType {
  module = 'NgModuleDecorator',
  component = 'ComponentDecorator',
  directive = 'DirectiveDecorator',
  injectable = 'InjectableDecorator'
}

export function parseDecoratorArguments(decoratorArguments: any): any {
  if (decoratorArguments.obj) {
    return parseObjectString(decoratorArguments.obj)
  }
}