import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { hasElementRefClass, mixinClassName } from 'sb-element';

@Component({
  selector: 'app-breadcrumbs-example',
  templateUrl: './breadcrumbs-example.html',
  styleUrls: ['./breadcrumbs-example.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"sb--padding-s"'
  }
})
export class BreadcrumbsExampleComponent extends mixinClassName(
  hasElementRefClass, 'app-breadcrumbs-example') {

  constructor(
    elementRef: ElementRef,
    public router: Router
  ) {
    super(elementRef);
  }
}
