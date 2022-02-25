import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { mixinClassName } from "../../../core";

const SbNavBarCore = mixinClassName(
  class {
    constructor(
      public _elementRef: ElementRef) {}
  }, 'sb-nav-bar'
);

@Component({
  selector: 'sb-nav-bar',
  templateUrl: './nav-bar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SbNavBarComponent extends SbNavBarCore {

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

}
