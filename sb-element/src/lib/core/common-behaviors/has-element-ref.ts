import { ElementRef } from "@angular/core";

export interface HasElementRef {
  _elementRef: ElementRef;
}

export const hasElementRefClass = class {
  constructor(public _elementRef: ElementRef) {}
}
