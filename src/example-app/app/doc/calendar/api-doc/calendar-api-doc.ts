import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from 'sb-element';

@Component({
  selector: 'app-calendar-api-doc',
  templateUrl: './calendar-api-doc.html',
  styleUrls: ['./calendar-api-doc.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"sb--padding-s"'
  }
})
export class CalendarApiDocComponent extends mixinClassName(
  hasElementRefClass, 'app-calendar-example') {

  constructor(elementRef: ElementRef) {
    super(elementRef)
  }

}
