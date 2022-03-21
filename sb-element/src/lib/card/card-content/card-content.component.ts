import { Component, ElementRef } from '@angular/core';
import { mixinClassName } from '../../core';

const SbCardContentCore = mixinClassName(
  class {
    constructor(public _elementRef: ElementRef) {}
  }, 'sb-card-content'
);

@Component({
  selector: 'sb-card-content',
  templateUrl: './card-content.component.html'
})
export class SbCardContentComponent extends SbCardContentCore {

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

}
