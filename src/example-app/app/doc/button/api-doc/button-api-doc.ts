import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from 'sb-element';

@Component({
  selector: 'app-button-api-doc',
  templateUrl: './button-api-doc.html',
  styleUrls: ['./button-api-doc.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"sb--padding-s"'
  }
})
export class ButtonApiDocComponent extends mixinClassName(
  hasElementRefClass, 'app-button-example') {

  constructor(elementRef: ElementRef) {
    super(elementRef)
  }

}
