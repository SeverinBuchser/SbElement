import { Directive, ElementRef } from '@angular/core';
import { hasElementRefClass, mixinClassName } from '../../core';

const SbCardImageCore = mixinClassName(hasElementRefClass, 'sb-card-image');

@Directive({
  selector: '[sbCardImage]',
  host: {
    '[class.border-bottom]': 'borderBottom',
    '[class.border-top]': 'borderTop'
  }
})
export class SbCardImageDirective extends SbCardImageCore {

  public borderTop: boolean = true;
  public borderBottom: boolean = true;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
