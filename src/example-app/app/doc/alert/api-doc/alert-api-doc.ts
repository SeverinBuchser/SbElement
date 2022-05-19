import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from 'sb-element';

@Component({
  selector: 'app-alert-api-doc',
  templateUrl: './alert-api-doc.html',
  styleUrls: ['./alert-api-doc.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"sb--padding-s"'
  }
})
export class AlertApiDocComponent extends mixinClassName(
  hasElementRefClass, 'app-alert-example') {

  constructor(elementRef: ElementRef) {
    super(elementRef)
  }

}
