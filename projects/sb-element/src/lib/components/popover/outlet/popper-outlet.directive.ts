import { Directive, ViewContainerRef } from '@angular/core';
import { PopoverPosition } from "../../../models/popover/popover-position";
import { PopperTriggerDirective } from "./../inlet/popper-trigger.directive";

@Directive({
  selector: '[sbElPopperOutlet]'
})
export class PopperOutletDirective {

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

  public move(trigger: PopperTriggerDirective): void {
    let position = this.getPosition(trigger);
    let offset = this.getOffset(trigger)
    this.translate(position.x + offset.x, position.y + offset.y);
  }

  private getPosition(trigger: PopperTriggerDirective): {x: number; y: number} {
    let positionToSet: DOMRect = this.boundingRect

    let x = trigger.boundingRect.left - positionToSet.left;
    let y = trigger.boundingRect.top - positionToSet.top;

    return {x, y};
  }

  private getOffset(
    trigger: PopperTriggerDirective
  ): {x: number, y: number} {

    let x: number = 0;
    let y: number = 0;

    switch (trigger.popoverPosition) {

      case PopoverPosition.TOP_LEFT:
        y = - this.boundingRect.height;
        x = 0;
        break;

      case PopoverPosition.TOP:
        y = - this.boundingRect.height;
        x = trigger.boundingRect.width / 2 - this.boundingRect.width / 2;
        break;

      case PopoverPosition.TOP_RIGHT:
        y = - this.boundingRect.height;
        x = trigger.boundingRect.width - this.boundingRect.width;
        break;

      case PopoverPosition.LEFT:
        y = trigger.boundingRect.height / 2 - this.boundingRect.height / 2;
        x = - this.boundingRect.width;
        break;

      case PopoverPosition.RIGHT:
        y = trigger.boundingRect.height / 2 - this.boundingRect.height / 2;
        x = trigger.boundingRect.width;
        break;

      case PopoverPosition.BOTTOM_LEFT:
        y = trigger.boundingRect.height;
        x = 0;
        break;

      case PopoverPosition.BOTTOM:
        y = trigger.boundingRect.height;
        x = trigger.boundingRect.width / 2 - this.boundingRect.width / 2;
        break;

      case PopoverPosition.BOTTOM_RIGHT:
        y = trigger.boundingRect.height;
        x = trigger.boundingRect.width - this.boundingRect.width;
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
