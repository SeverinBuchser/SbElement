import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from '../core';

const SbPopperContentCore = mixinClassName(hasElementRefClass, 'sb-popper-content');

@Component({
  selector: 'sb-popper-content',
  templateUrl: './popper-content.component.html',
  styleUrls: ['./popper-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SbPopperContentComponent extends SbPopperContentCore {

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
