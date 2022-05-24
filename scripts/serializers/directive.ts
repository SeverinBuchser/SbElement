import { Serializer } from "typedoc";
import { AngularDirectiveResolvedDecoratorArguments } from "../resolvers";
import { AngularDecoratorSerializer, DecoratorWrapper } from "./decorator";

export class AngularDirectiveDecoratorSerializer 
  extends AngularDecoratorSerializer<AngularDirectiveResolvedDecoratorArguments> {

  constructor(serializer: Serializer) {
    super(serializer, 'Directive');
  }

  public toObject(
    { decorator }: DecoratorWrapper<AngularDirectiveResolvedDecoratorArguments>, 
    obj: object = {}
  ): Partial<any> {

    const args: any = {
      ...decorator.arguments,
      inputs: this.owner.toObject(decorator.arguments.inputs),
      outputs: this.owner.toObject(decorator.arguments.outputs),
      providers: this.owner.toObject(decorator.arguments.providers)
    }
    
    return {
      ...obj,
      ...decorator,
      type: this.owner.toObject(decorator.type),
      arguments: args
    }
  }
  
}
