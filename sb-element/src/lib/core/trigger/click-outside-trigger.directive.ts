import { Directive, HostListener, Input } from '@angular/core';
import { Poppable } from './poppable';
import { SbClickTriggerDirective } from './click-trigger.directive';

@Directive({
  selector: '[sbClickOutsideTrigger]'
})
export class SbClickOutsideTriggerDirective extends SbClickTriggerDirective {

  @Input()
  public triggerable!: Poppable

  @HostListener('document: click', ['$event'])
  handleDocumentClick(event: PointerEvent): void {
    let popperBBox = this.triggerable.getPopperRef().nativeElement.getBoundingClientRect()
    if (!this.isMouseoverBoundingRect(event, popperBBox) && this.triggerable.isPopped()) {
      this.trigger();
    }
  }

  private isMouseoverBoundingRect(
    event: PointerEvent, boundingRect: DOMRect
  ): boolean {
    let mouseX: number = event.clientX;
    let mouseY: number = event.clientY;

    let xInBounds = mouseX >= boundingRect.left && mouseX <= boundingRect.right;
    let yInBounds = mouseY >= boundingRect.top && mouseY <= boundingRect.bottom;

    return xInBounds && yInBounds;
  }

}
