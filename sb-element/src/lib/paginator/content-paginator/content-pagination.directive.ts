import { Directive, ElementRef } from '@angular/core';
import { HasElementRef } from '../../core';

@Directive({
  selector: '[sbContentPagination]'
})
export class SbContentPaginationDirective implements HasElementRef {

  constructor(public _elementRef: ElementRef) { }

}
