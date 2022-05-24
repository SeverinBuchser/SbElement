import { Decorator } from "typedoc";
import { AngularHost, AngularIO, AngularProvider, AngularQueries } from "../util";
import { AngularDecorator } from "./decorator";
import { convertAngularProviders } from "./util";

export function convertAngularDirectiveDecorator(
  decorator: Decorator
): AngularDecorator<AngularDirectiveDecoratorArguments> {

  if (!decorator.arguments) {
    decorator.arguments = {};
  }

  if (!decorator.arguments.obj) {
    decorator.arguments.obj = {};
  }

  if (!decorator.arguments.obj.inputs) {
    decorator.arguments.obj.inputs = new Array();
  }

  if (!decorator.arguments.obj.outputs) {
    decorator.arguments.obj.outputs = new Array();
  }
  
  if (!decorator.arguments.obj.providers) {
    decorator.arguments.obj.providers = new Array();
  }

  if (!decorator.arguments.obj.queries) {
    decorator.arguments.obj.queries = {};
  }

  if (!decorator.arguments.obj.host) {
    decorator.arguments.obj.host = {};
  }

  decorator.arguments.obj.inputs = decorator.arguments.obj.inputs.map((io: string) => {
    let split = io.split(':');
    return {
      directiveProperty: split[0],
      bindingProperty: split[1] ? split[1] : split[0]
    }
  });

  decorator.arguments.obj.outputs = decorator.arguments.obj.outputs.map((io: string) => {
    let split = io.split(':');
    return {
      directiveProperty: split[0],
      bindingProperty: split[1] ? split[1] : split[0]
    }
  });
  
  decorator.arguments.obj.providers = convertAngularProviders(decorator.arguments.obj.providers)

  return new AngularDecorator<AngularDirectiveDecoratorArguments>(
    decorator.name, 
    decorator.arguments.obj,
    decorator.type
 );
}

export interface AngularDirectiveDecoratorArguments {
  selector?: string;
  inputs: Array<AngularIO>;
  outputs: Array<AngularIO>;
  providers: Array<AngularProvider>;
  exportAs?: string;
  queries: AngularQueries;
  host: AngularHost;
  jit?: string;
}