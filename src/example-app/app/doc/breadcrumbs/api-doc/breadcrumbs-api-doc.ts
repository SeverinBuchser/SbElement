import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from 'sb-element';

@Component({
  selector: 'app-breadcrumbs-api-doc',
  templateUrl: './breadcrumbs-api-doc.html',
  styleUrls: ['./breadcrumbs-api-doc.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"sb--padding-s"'
  }
})
export class BreadcrumbsApiDocComponent extends mixinClassName(
  hasElementRefClass, 'app-breadcrumbs-example') {

  constructor(elementRef: ElementRef) {
    super(elementRef)
  }

}
