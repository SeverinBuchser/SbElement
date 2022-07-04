import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from 'sb-element';

@Component({
  selector: 'app-grid-example',
  templateUrl: './grid-example.html',
  styleUrls: ['./grid-example.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"sb--padding-s"'
  }
})
export class GridExampleComponent extends mixinClassName(
  hasElementRefClass, 'app-grid-example') {

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
