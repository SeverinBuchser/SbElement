import { Directive, EventEmitter, HostListener, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sbElPopoverInlet]'
})
export class PopoverInletDirective {

  public mouseleave: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @HostListener('mouseleave', ['$event']) handleMouseleave(event: MouseEvent) {
    this.mouseleave.emit(event)
  }

  constructor(public viewContainerRef: ViewContainerRef) {}

  get boundingRect(): DOMRect {
    return this.viewContainerRef.element.nativeElement.getBoundingClientRect();
  }

}
