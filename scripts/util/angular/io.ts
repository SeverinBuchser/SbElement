import { ReferenceReflection } from "typedoc";

export interface AngularIO {
  directiveProperty: string;
  bindingProperty: string;
}

export interface AngularResolvedIO {
  directiveProperty: ReferenceReflection;
  bindingProperty: string;
}