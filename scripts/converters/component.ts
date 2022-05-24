import { Decorator } from "typedoc";
import { AngularProvider } from "../util";
import { AngularDecorator } from "./decorator";
import { AngularDirectiveDecoratorArguments } from "./directive";
import { convertAngularProviders } from "./util";

export function convertAngularComponentDecorator(
  decorator: Decorator
): AngularDecorator<AngularComponentDecoratorArguments> {

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

  if (!decorator.arguments.obj.viewProviders) {
    decorator.arguments.obj.viewProviders = new Array();
  }

  if (!decorator.arguments.obj.styleUrls) {
    decorator.arguments.obj.styleUrls = new Array();
  }

  if (!decorator.arguments.obj.styles) {
    decorator.arguments.obj.styles = new Array();
  }

  if (!decorator.arguments.obj.animations) {
    decorator.arguments.obj.animations = new Array();
  }

  decorator.arguments.obj.inputs = decorator.arguments.obj.inputs.map((io: string) => {
    let split = io.split(':').map(split => split.replaceAll(/[`'"]/g, ""));
    return JSON.parse(`{
      "directiveProperty": "${split[0]}",
      "bindingProperty": "${split[1] ? split[1] : split[0]}"
    }`)
  });

  decorator.arguments.obj.outputs = decorator.arguments.obj.outputs.map((io: string) => {
    let split = io.split(':');
    return {
      directiveProperty: split[0],
      bindingProperty: split[1] ? split[1] : split[0]
    }
  });

  decorator.arguments.obj.providers = convertAngularProviders(decorator.arguments.obj.providers)
  decorator.arguments.obj.viewProviders = convertAngularProviders(decorator.arguments.obj.viewProviders)

  return new AngularDecorator<AngularComponentDecoratorArguments>(
    decorator.name, 
    decorator.arguments.obj,
    decorator.type
  );
}

export interface AngularComponentDecoratorArguments extends AngularDirectiveDecoratorArguments {
  changeDetection?: string;
  viewProviders: Array<AngularProvider>;
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

function isComponentDecorator(): boolean {
  return true;
}