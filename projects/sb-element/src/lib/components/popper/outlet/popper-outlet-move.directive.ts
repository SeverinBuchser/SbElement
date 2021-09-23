import { Directive, ElementRef } from '@angular/core';
import { PopoverPosition } from "../../../models/popover/popover-position";

@Directive({
  selector: '[sbElPopperOutletMove]'
})
export class PopperOutletMoveDirective {

  constructor(private element: ElementRef) { }

  get boundingRect(): DOMRect {
    return this.element.nativeElement.getBoundingClientRect();
  }

  private translate(x: number, y: number): void {
    this.element.nativeElement.style.transform = "translate("
      + x + "px, " + y + "px" + ")";
  }

  public moveTo(
    boundingRect: DOMRect,
    popoverPosition: string
  ): void {
    let offset = this.getOffset(boundingRect);
    let adjustment = this.getAdjustment(boundingRect, popoverPosition)
    this.translate(offset.x + adjustment.x, offset.y + adjustment.y);
  }

  private getOffset(triggerDimensions: DOMRect): {x: number; y: number} {
    let outletDimensions: DOMRect = this.boundingRect

    let x = triggerDimensions.left - outletDimensions.left;
    let y = triggerDimensions.top - outletDimensions.top;

    return {x, y};
  }

  private getAdjustment(
    boundingRect: DOMRect,
    popoverPosition: string
  ): {x: number, y: number} {

    let x: number = 0;
    let y: number = 0;

    switch (popoverPosition) {

      case PopoverPosition.TOP_LEFT:
        y = - this.boundingRect.height;
        x = 0;
        break;

      case PopoverPosition.TOP:
        y = - this.boundingRect.height;
        x = boundingRect.width / 2 - this.boundingRect.width / 2;
        break;

      case PopoverPosition.TOP_RIGHT:
        y = - this.boundingRect.height;
        x = boundingRect.width - this.boundingRect.width;
        break;

      case PopoverPosition.LEFT:
        y = boundingRect.height / 2 - this.boundingRect.height / 2;
        x = - this.boundingRect.width;
        break;

      case PopoverPosition.RIGHT:
        y = boundingRect.height / 2 - this.boundingRect.height / 2;
        x = boundingRect.width;
        break;

      case PopoverPosition.BOTTOM_LEFT:
        y = boundingRect.height;
        x = 0;
        break;

      case PopoverPosition.BOTTOM:
        y = boundingRect.height;
        x = boundingRect.width / 2 - this.boundingRect.width / 2;
        break;

      case PopoverPosition.BOTTOM_RIGHT:
        y = boundingRect.height;
        x = boundingRect.width - this.boundingRect.width;
        break;

      default:
        y = - this.boundingRect.height;
        x = 0;
        break;
    }

    return {x, y}
  }

  public moveBack(): void {
    this.translate(0, 0);
  }

}
