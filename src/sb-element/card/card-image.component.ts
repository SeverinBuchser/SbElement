import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from '../core';

const SbCardImageCore = mixinClassName(hasElementRefClass, 'sb-card-image');

@Component({
  selector: 'img[sbCardImage]',
  template: '',
  styleUrls: ['./card-image.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.border-bottom]': 'borderBottom',
    '[class.border-top]': 'borderTop'
  }
})
export class SbCardImageComponent extends SbCardImageCore {

  public borderTop: boolean = true;
  public borderBottom: boolean = true;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
