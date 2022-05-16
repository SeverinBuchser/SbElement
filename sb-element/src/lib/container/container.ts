import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from '../core';

const SbContainerCore = mixinClassName(hasElementRefClass, 'sb-container');

@Component({
  selector: 'sb-container',
  templateUrl: './container.html',
  styleUrls: ['./container.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SbContainerComponent extends SbContainerCore {

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
