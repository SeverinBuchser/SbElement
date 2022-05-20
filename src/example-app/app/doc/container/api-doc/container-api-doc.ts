import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from 'sb-element';

@Component({
  selector: 'app-container-api-doc',
  templateUrl: './container-api-doc.html',
  styleUrls: ['./container-api-doc.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"sb--padding-s"'
  }
})
export class ContainerApiDocComponent extends mixinClassName(
  hasElementRefClass, 'app-container-example') {

  constructor(elementRef: ElementRef) {
    super(elementRef)
  }

}
