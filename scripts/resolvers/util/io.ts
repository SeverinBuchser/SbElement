import { AngularIO, AngularResolvedIO } from "../../util";
import { 
  DeclarationReflection, 
  ReferenceReflection 
} from "typedoc";

export function resolveIO(
  ios: Array<AngularIO>,
  reflection: DeclarationReflection
): Array<AngularResolvedIOWrapper> {
  return ios.map((io: any) => {
    return new AngularResolvedIOWrapper({
      ...io,
      directiveProperty: new ReferenceReflection(
        io.directiveProperty, 
        reflection.getChildByName(io.directiveProperty)!, 
        reflection
      )
    })
  })
}

export class AngularResolvedIOWrapper {
  constructor(public io: AngularResolvedIO) {}
}