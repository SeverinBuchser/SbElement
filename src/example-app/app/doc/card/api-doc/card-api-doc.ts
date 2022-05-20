import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from 'sb-element';

@Component({
  selector: 'app-card-api-doc',
  templateUrl: './card-api-doc.html',
  styleUrls: ['./card-api-doc.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"sb--padding-s"'
  }
})
export class CardApiDocComponent extends mixinClassName(
  hasElementRefClass, 'app-card-example') {

  constructor(elementRef: ElementRef) {
    super(elementRef)
  }

}
