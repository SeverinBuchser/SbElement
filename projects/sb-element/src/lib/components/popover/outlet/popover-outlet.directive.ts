import { Directive, ViewContainerRef } from '@angular/core';
import { PopoverDirection } from "../../../models/popover/popover-direction";
import { PopoverInletDirective } from "./../inlet/popover-inlet.directive";

@Directive({
  selector: '[sbElPopoverOutlet]'
})
export class PopoverOutletDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

  get parentElement(): HTMLElement {
    return this.viewContainerRef.element.nativeElement.parentElement;
  }

  get boundingRect(): DOMRect {
    return this.parentElement.getBoundingClientRect();
  }

  public translate(x: number, y: number): void {
    this.parentElement.style.transform = "translate("
      + x + "px, " + y + "px" + ")";
  }

  public move(inlet: PopoverInletDirective, direction: PopoverDirection): void {
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
    inlet: PopoverInletDirective,
    direction: PopoverDirection = PopoverDirection.TOP_LEFT
  ): {x: number, y: number} {

    let x: number = 0;
    let y: number = 0;

    switch (direction) {
      case PopoverDirection.TOP_LEFT:

        y = - this.boundingRect.height;

        break;

      case PopoverDirection.TOP:
        console.log("hi")

        break;

      case PopoverDirection.TOP_RIGHT:
        console.log("hi")

        break;

      case PopoverDirection.LEFT:
        console.log("hi")

        break;

      case PopoverDirection.RIGHT:
        console.log("hi")

        break;

      case PopoverDirection.BOTTOM_LEFT:
        console.log("hi")

        break;

      case PopoverDirection.BOTTOM:
        console.log("hi")

        break;

      case PopoverDirection.BOTTOM_RIGHT:
        console.log("hi")

        break;

      default:
        break;
    }

    return {x, y}
  }

  public reset(): void {
    this.viewContainerRef.clear();
    this.translate(0, 0);
  }

}
