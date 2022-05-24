import { Decorator } from "typedoc";
import { AngularProvider } from "../util";
import { AngularDecorator } from "./decorator";
import { convertAngularProviders } from "./util";

export function convertAngularModuleDecorator(
  decorator: Decorator
): AngularDecorator<AngularModuleDecoratorArguments> {

  if (!decorator.arguments) {
    decorator.arguments = {};
  }

  if (!decorator.arguments.obj) {
    decorator.arguments.obj = {};
  }
  
  if (!decorator.arguments.obj.providers) {
    decorator.arguments.obj.providers = new Array();
  }
  
  if (!decorator.arguments.obj.declarations) {
    decorator.arguments.obj.declarations = new Array();
  }
  
  if (!decorator.arguments.obj.imports) {
    decorator.arguments.obj.imports = new Array();
  }
  
  if (!decorator.arguments.obj.exports) {
    decorator.arguments.obj.exports = new Array();
  }

  if (!decorator.arguments.obj.bootstrap) {
    decorator.arguments.obj.bootstrap = new Array();
  }

  if (!decorator.arguments.obj.schemas) {
    decorator.arguments.obj.schemas = new Array();
  }
  
  decorator.arguments.obj.providers = convertAngularProviders(decorator.arguments.obj.providers)

  return new AngularDecorator<AngularModuleDecoratorArguments>(
    decorator.name, 
    decorator.arguments.obj,
    decorator.type
  );
}

export interface AngularModuleDecoratorArguments {
  changeDetection?: string;
  providers: Array<AngularProvider>;
  declarations: Array<string>;
  imports: Array<string>;
  exports: Array<string>;
  bootstrap: Array<string>;
  schemas: Array<any>;
  id?: string;
  jit?: string;
}