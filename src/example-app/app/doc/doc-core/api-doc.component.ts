import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from 'sb-element';

@Component({
  selector: 'app-api-doc',
  templateUrl: './api-doc.component.html',
  styleUrls: ['./api-doc.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ApiDocComponent extends mixinClassName(hasElementRefClass, 'app-api-doc') {

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
