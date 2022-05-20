import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from '../core';

const SbContainerCore = mixinClassName(hasElementRefClass, 'sb-container');

@Component({
  selector: 'sb-container',
  template: '<ng-content></ng-content>',
  styleUrls: ['./container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SbContainerComponent extends SbContainerCore {

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
