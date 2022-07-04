import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from 'sb-element';

@Component({
  selector: 'app-container-example',
  templateUrl: './container-example.html',
  styleUrls: ['./container-example.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"sb--padding-s"'
  }
})
export class ContainerExampleComponent extends mixinClassName(
  hasElementRefClass, 'app-container-example') {

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
