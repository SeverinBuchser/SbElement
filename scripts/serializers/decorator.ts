import { AngularModuleResolvedDecoratorArguments } from "scripts/resolvers";
import { Decorator, Serializer, SerializerComponent } from "typedoc";
import { AngularDecorator, AngularDecoratorType } from "../converters";

export abstract class AngularDecoratorSerializer<T> extends SerializerComponent<DecoratorWrapper<T>> {

  constructor(serializer: Serializer, private _angularDeoratorType: AngularDecoratorType) {
    super(serializer);
  }

  override get priority(): number {
    return 1;
  }

  public serializeGroup(instance: any): boolean {
    if (instance.decorator) {
      return instance.decorator instanceof AngularDecorator
    }
    return false;
  }

  public supports(item: DecoratorWrapper<T>): boolean {
    return this.serializeGroup(item) 
      && item.decorator.isAngularDecoratorType(this._angularDeoratorType)
  }

  public abstract toObject(item: DecoratorWrapper<T>, obj?: object): Partial<any>;
  
}

export interface DecoratorWrapper<T> {
  decorator: AngularDecorator<T>;
}