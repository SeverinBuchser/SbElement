import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from '../core';

const SbCardImageCore = mixinClassName(hasElementRefClass, 'sb-card-image');

@Component({
  selector: 'img[sbCardImage]',
  template: '',
  styleUrls: ['./card-image.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SbCardImageComponent extends SbCardImageCore {

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
