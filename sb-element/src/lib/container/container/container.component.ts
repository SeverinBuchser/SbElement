import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { mixinClassName } from '../../core';

const SbContainerCore = mixinClassName(
  class {
    constructor(public _elementRef: ElementRef) {}
  }, 'sb-container'
);

@Component({
  selector: 'sb-container',
  templateUrl: './container.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SbContainerComponent extends SbContainerCore {

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

}
