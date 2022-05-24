import { parseObjectString } from "./parse-object";

export enum AngularDecoratorType {
  module = 'NgModuleDecorator',
  component = 'ComponentDecorator',
  directive = 'DirectiveDecorator',
  injectable = 'InjectableDecorator'
}

export function parseArguments(args: any): any {
  const keys = Object.keys(args);
  keys.forEach((key: string) => {
    if (typeof args[key] == 'string') {
      args[key] = parseObjectString(args[key]);
    }
  })
  return args;
}