import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { mixinClassName } from "../../../core";

const SbToasterCore = mixinClassName(
  class {
    constructor(
      public _elementRef: ElementRef) {}
  }, 'sb-toaster'
);

@Component({
  selector: 'sb-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SbToasterComponent extends SbToasterCore {

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

}
