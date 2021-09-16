import { Directive, EventEmitter, HostListener, Input, ViewContainerRef } from '@angular/core';
import { PopoverPosition } from "../../../models/popover/popover-position";

@Directive({
  selector: '[sbElPopoverInlet]'
})
export class PopoverInletDirective {

  public mouseleave: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @HostListener('mouseleave', ['$event']) handleMouseleave(event: MouseEvent) {
    this.mouseleave.emit(event)
  }

  @Input()
  public popoverPosition: string = PopoverPosition.TOP_LEFT;

  @Input()
  public allowMouseover: boolean = false;

  @Input()
  public arrow: boolean = true;

  constructor(public viewContainerRef: ViewContainerRef) {}

  get boundingRect(): DOMRect {
    return this.viewContainerRef.element.nativeElement.getBoundingClientRect();
  }

}
