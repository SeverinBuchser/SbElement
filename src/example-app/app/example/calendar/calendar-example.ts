import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from 'sb-element';

@Component({
  selector: 'app-calendar-example',
  templateUrl: './calendar-example.html',
  styleUrls: ['./calendar-example.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"sb--padding-s"'
  }
})
export class CalendarExampleComponent extends mixinClassName(
  hasElementRefClass, 'app-calendar-example') {

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
