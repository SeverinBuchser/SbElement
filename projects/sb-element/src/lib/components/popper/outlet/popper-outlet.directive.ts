import { Directive, ViewContainerRef } from '@angular/core';
import { PopoverPosition } from "../../../models/popover/popover-position";

@Directive({
  selector: '[sbElPopperOutlet]'
})
export class PopperOutletDirective {

  constructor(public viewContainerRef: ViewContainerRef) {}

  get parentElement(): HTMLElement {
    return this.viewContainerRef.element.nativeElement.parentElement.parentElement;
  }

  get boundingRect(): DOMRect {
    return this.parentElement.getBoundingClientRect();
  }

  public translate(x: number, y: number): void {
    this.parentElement.style.transform = "translate("
      + x + "px, " + y + "px" + ")";
  }

  public alignToTrigger(
    triggerDimensions: DOMRect,
    popoverPosition: string
  ): void {
    let offset = this.getOffset(triggerDimensions);
    let adjustment = this.getAdjustment(triggerDimensions, popoverPosition)
    this.translate(offset.x + adjustment.x, offset.y + adjustment.y);
  }

  private getOffset(triggerDimensions: DOMRect): {x: number; y: number} {
    let outletDimensions: DOMRect = this.boundingRect

    let x = triggerDimensions.left - outletDimensions.left;
    let y = triggerDimensions.top - outletDimensions.top;

    return {x, y};
  }

  private getAdjustment(
    triggerDimensions: DOMRect,
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
        x = triggerDimensions.width / 2 - this.boundingRect.width / 2;
        break;

      case PopoverPosition.TOP_RIGHT:
        y = - this.boundingRect.height;
        x = triggerDimensions.width - this.boundingRect.width;
        break;

      case PopoverPosition.LEFT:
        y = triggerDimensions.height / 2 - this.boundingRect.height / 2;
        x = - this.boundingRect.width;
        break;

      case PopoverPosition.RIGHT:
        y = triggerDimensions.height / 2 - this.boundingRect.height / 2;
        x = triggerDimensions.width;
        break;

      case PopoverPosition.BOTTOM_LEFT:
        y = triggerDimensions.height;
        x = 0;
        break;

      case PopoverPosition.BOTTOM:
        y = triggerDimensions.height;
        x = triggerDimensions.width / 2 - this.boundingRect.width / 2;
        break;

      case PopoverPosition.BOTTOM_RIGHT:
        y = triggerDimensions.height;
        x = triggerDimensions.width - this.boundingRect.width;
        break;

      default:
        y = - this.boundingRect.height;
        x = 0;
        break;
    }

    return {x, y}
  }

  public reset(): Promise<void> {
    this.viewContainerRef.clear();
    this.translate(0, 0);
    return Promise.resolve();
  }

}
