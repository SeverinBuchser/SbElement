import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { mixinClassName } from '../../core';

const SbPopperContentCore = mixinClassName(
  class {
    constructor(public _elementRef: ElementRef) {}
  }, 'sb-popper-content'
);

@Component({
  selector: 'sb-popper-content',
  templateUrl: './popper-content.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SbPopperContentComponent extends SbPopperContentCore {

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

}
