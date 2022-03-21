import { Directive, ElementRef } from '@angular/core';
import { mixinClassName } from '../../core';

const SbCardImageCore = mixinClassName(
  class {
    constructor(public _elementRef: ElementRef) {}
  }, 'sb-card-image'
);

@Directive({
  selector: '[sbCardImage]',
  host: {
    '[class.border-top]': 'borderTop',
    '[class.border-bottom]': 'borderBottom'
  }
})
export class SbCardImageDirective extends SbCardImageCore {

  public borderTop: boolean = true;
  public borderBottom: boolean = true;

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

}
