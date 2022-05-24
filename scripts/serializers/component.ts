import { Serializer } from "typedoc";
import { AngularComponentResolvedDecoratorArguments } from "../resolvers";
import { AngularDecoratorSerializer, DecoratorWrapper } from "./decorator";

export class AngularComponentDecoratorSerializer 
  extends AngularDecoratorSerializer<AngularComponentResolvedDecoratorArguments> {

  constructor(serializer: Serializer) {
    super(serializer, 'Component');
  }

  public toObject(
    { decorator }: DecoratorWrapper<AngularComponentResolvedDecoratorArguments>, 
    obj: object = {}
  ): Partial<any> {

    const args: any = {
      ...decorator.arguments,
      inputs: this.owner.toObject(decorator.arguments.inputs),
      outputs: this.owner.toObject(decorator.arguments.outputs),
      providers: this.owner.toObject(decorator.arguments.providers),
      viewProviders: this.owner.toObject(decorator.arguments.viewProviders)
    }
    
    return {
      ...obj,
      ...decorator,
      type: this.owner.toObject(decorator.type),
      arguments: args
    }
  }
}
