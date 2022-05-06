import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { mixinClassName } from '../../../core';

const SbNavBarContentCore = mixinClassName(
  class {
    constructor(public _elementRef: ElementRef) {}
  }, 'sb-nav-bar-content'
);

@Component({
  selector: 'sb-nav-bar-content',
  templateUrl: './nav-bar-content.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SbNavBarContentComponent extends SbNavBarContentCore {

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }


}