import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[sbContentPagination]'
})
export class SbContentPaginationDirective {

  constructor(public _elementRef: ElementRef) { }

}
