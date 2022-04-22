import { Component, ElementRef, Input } from '@angular/core';
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

  @Input()
  public showTopDivider: boolean = false;

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

}
