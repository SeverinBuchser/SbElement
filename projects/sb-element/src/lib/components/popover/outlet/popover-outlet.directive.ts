import { Directive, ViewContainerRef } from '@angular/core';
import { PopoverPosition } from "../../../models/popover/popover-position";
import { PopoverInletDirective } from "./../inlet/popover-inlet.directive";

@Directive({
  selector: '[sbElPopoverOutlet]'
})
export class PopoverOutletDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

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

  public move(inlet: PopoverInletDirective): void {
    let position = this.getPosition(inlet);
    let offset = this.getOffset(inlet)
    this.translate(position.x + offset.x, position.y + offset.y);
  }

  private getPosition(inlet: PopoverInletDirective): {x: number; y: number} {
    let positionToSet: DOMRect = this.boundingRect

    let x = inlet.boundingRect.left - positionToSet.left;
    let y = inlet.boundingRect.top - positionToSet.top;

    return {x, y};
  }

  private getOffset(
    inlet: PopoverInletDirective
  ): {x: number, y: number} {

    let x: number = 0;
    let y: number = 0;

    switch (inlet.popoverPosition) {

      case PopoverPosition.TOP_LEFT:
        y = - this.boundingRect.height;
        x = 0;
        break;

      case PopoverPosition.TOP:
        y = - this.boundingRect.height;
        x = inlet.boundingRect.width / 2 - this.boundingRect.width / 2;
        break;

      case PopoverPosition.TOP_RIGHT:
        y = - this.boundingRect.height;
        x = inlet.boundingRect.width - this.boundingRect.width;
        break;

      case PopoverPosition.LEFT:
        y = inlet.boundingRect.height / 2 - this.boundingRect.height / 2;
        x = - this.boundingRect.width;
        break;

      case PopoverPosition.RIGHT:
        y = inlet.boundingRect.height / 2 - this.boundingRect.height / 2;
        x = inlet.boundingRect.width;
        break;

      case PopoverPosition.BOTTOM_LEFT:
        y = inlet.boundingRect.height;
        x = 0;
        break;

      case PopoverPosition.BOTTOM:
        y = inlet.boundingRect.height;
        x = inlet.boundingRect.width / 2 - this.boundingRect.width / 2;
        break;

      case PopoverPosition.BOTTOM_RIGHT:
        y = inlet.boundingRect.height;
        x = inlet.boundingRect.width - this.boundingRect.width;
        break;

      default:
        y = - this.boundingRect.height;
        x = 0;
        break;
    }

    return {x, y}
  }

  public reset(): void {
    this.viewContainerRef.clear();
    this.translate(0, 0);
  }

}
