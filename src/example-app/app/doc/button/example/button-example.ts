import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from 'sb-element';

@Component({
  selector: 'app-button-example',
  templateUrl: './button-example.html',
  styleUrls: ['./button-example.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"sb--padding-s"'
  }
})
export class ButtonExampleComponent extends mixinClassName(
  hasElementRefClass, 'app-button-example') {

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
