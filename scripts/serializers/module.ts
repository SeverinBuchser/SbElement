import { Serializer } from "typedoc";
import { AngularModuleResolvedDecoratorArguments } from "../resolvers";
import { AngularDecoratorSerializer, DecoratorWrapper } from "./decorator";

export class AngularModuleDecoratorSerializer 
  extends AngularDecoratorSerializer<AngularModuleResolvedDecoratorArguments> {

  constructor(serializer: Serializer) {
    super(serializer, 'NgModule');
  }

  public toObject(
    { decorator }: DecoratorWrapper<AngularModuleResolvedDecoratorArguments>, 
    obj?: any
  ): Partial<any> {
    const args: any = {
      ...decorator.arguments,
      viewProviders: this.owner.toObject(decorator.arguments.viewProviders),
      providers: this.owner.toObject(decorator.arguments.providers),
      declarations: this.owner.toObject(decorator.arguments.declarations),
      imports: this.owner.toObject(decorator.arguments.imports),
      exports: this.owner.toObject(decorator.arguments.exports),
      bootstrap: this.owner.toObject(decorator.arguments.bootstrap),
      schemas: this.owner.toObject(decorator.arguments.schemas)
    }
    
    return {
      ...obj,
      ...decorator,
      type: this.owner.toObject(decorator.type),
      arguments: args
    }
  }
  
}
