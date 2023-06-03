import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from 'sb-element';

@Component({
  selector: 'app-card-example',
  templateUrl: './card-example.html',
  styleUrls: ['./card-example.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"sb--padding-s"'
  }
})
export class CardExampleComponent extends mixinClassName(
  hasElementRefClass, 'app-card-example') {

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
