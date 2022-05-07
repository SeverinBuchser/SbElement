import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from '../../../core';

const SbNavBarContentCore = mixinClassName(hasElementRefClass, 'sb-nav-bar-content');

@Component({
  selector: 'sb-nav-bar-content',
  templateUrl: './nav-bar-content.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SbNavBarContentComponent extends SbNavBarContentCore {

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
