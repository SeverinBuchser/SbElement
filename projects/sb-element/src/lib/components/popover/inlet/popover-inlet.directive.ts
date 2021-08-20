import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sbElPopoverInlet]'
})
export class PopoverInletDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

  get boundingRect(): DOMRect {
    return this.viewContainerRef.element.nativeElement.getBoundingClientRect();
  }

}
