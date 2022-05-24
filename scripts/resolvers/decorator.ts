import {
  AngularComponentDecoratorArguments,
  AngularDecorator,
  AngularModuleDecoratorArguments
} from "scripts/converters";
import {
  DeclarationReflection,
  Decorator
} from "typedoc";
import { resolveComponentDecoratorArguments } from "./component";
import { resolveNgModuleDecoratorArguments } from "./module";

export function resolveAngularDecorator(
  decorator: AngularDecorator<any> | Decorator, 
  reflection: DeclarationReflection
): any {
  switch (decorator.name) {
    case 'NgModule':
      return resolveNgModuleDecoratorArguments(
        decorator as AngularDecorator<AngularModuleDecoratorArguments>, 
        reflection
      );
    case 'Component':
      return resolveComponentDecoratorArguments(
        decorator as AngularDecorator<AngularComponentDecoratorArguments>,
        reflection
      );
    case 'Injectable':
      return decorator;
    case 'Directive':
      return decorator;
    case 'Pipe':
      return decorator;
    case 'Input':
      return decorator;
    case 'Output':
      return decorator;
    case 'HostBinding':
      return decorator;
    case 'HostListener':
      return decorator;
    case 'ContentChild':
      return decorator;
    case 'ContentChildren':
      return decorator;
    case 'ViewChild':
      return decorator;
    case 'ViewChildren':
      return decorator;
  }
  return decorator;
}