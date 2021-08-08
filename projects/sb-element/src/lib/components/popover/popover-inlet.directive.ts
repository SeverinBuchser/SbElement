import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sbElPopoverInlet]'
})
export class PopoverInletDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

  public getPosition(): DOMRect {
    return this.viewContainerRef.element.nativeElement.getBoundingClientRect();
  }

}
