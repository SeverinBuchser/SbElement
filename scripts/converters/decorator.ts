import { Decorator, Type } from "typedoc";
import { convertAngularComponentDecorator } from "./component";
import { convertAngularDirectiveDecorator } from "./directive";
import { convertAngularModuleDecorator } from "./module";

export function convertAngularDecorator(decorator: Decorator): AngularDecorator<any> | Decorator {
  switch (decorator.name) {
    case 'NgModule':
      return convertAngularModuleDecorator(decorator);
    case 'Component':
      return convertAngularComponentDecorator(decorator);
    case 'Injectable':
      return decorator;
    case 'Directive':
      return convertAngularDirectiveDecorator(decorator);
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

export type AngularDecoratorType = 'NgModule' 
  | 'Component' 
  | 'Injectable' 
  | 'Directive'
  | 'Pipe'
	| 'Input'
	| 'Output'
	| 'HostBinding'
	| 'HostListener'
	| 'ContentChild'
	| 'ContentChildren'
	| 'ViewChild'
	| 'ViewChildren';

export class AngularDecorator<T> implements Decorator {
  public angularDecoratorType: AngularDecoratorType;
  public arguments: T;

  constructor(
    public name: string,
    args: T,
    public type?: Type | undefined
  ) {
    this.arguments = args;
    this.angularDecoratorType = this.name as AngularDecoratorType;
  }

  public isAngularDecoratorType(angularDecoratorType: AngularDecoratorType): boolean {
    return this.angularDecoratorType == angularDecoratorType;
  }
}