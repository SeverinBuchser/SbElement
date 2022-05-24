import { Serializer, SerializerComponent } from "typedoc";
import { AngularResolvedIOWrapper } from "../../resolvers";

export class AngularIOSerializer extends SerializerComponent<any> {

  constructor(serializer: Serializer) {
    super(serializer);
  }

  override get priority(): number {
    return 1;
  }

  public serializeGroup(instance: any): boolean {
    return instance instanceof AngularResolvedIOWrapper
  }

  public supports(item: any): boolean {
    return this.serializeGroup(item);
  }

  public toObject({ io }: AngularResolvedIOWrapper, obj?: object): any {
    return {
      ...obj,
      ...io,
      directiveProperty: this.owner.toObject(io.directiveProperty),
    }
  }
  
}