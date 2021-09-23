import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { PopperService } from "../../../../../services/popper/popper.service";
import { PopperOutletComponent } from "../../../outlet/popper-outlet.component";
import { PopupTriggerDirective } from "../popup-trigger.directive";

@Directive({
  selector: '[sbElPopupTriggerClick]'
})
export class PopupTriggerClickDirective extends PopupTriggerDirective {

  @Output() public trigger: EventEmitter<void> = new EventEmitter<void>();
  @HostListener('click', ['$event']) handleClick(event: MouseEvent): void {
    if (!this.popperService.isPopped) event.stopPropagation();
    this.trigger.emit();
  }

  constructor(protected popperService: PopperService) {
    super();
  }

  protected subscribe(): void {
    this.subscriptions.push(this.outlet.click.subscribe((event: MouseEvent) => {
      if (this.checkUnpop(event, this.outlet)) this.popperService.unpop();
    }))
  }

  private checkUnpop(event: MouseEvent, outlet: PopperOutletComponent) {
    return !this.isMouseoverBoundingRect(event, outlet.boundingRect);
  }

  private isMouseoverBoundingRect(event: MouseEvent, boundingRect: DOMRect): boolean {
    let mouseX: number = event.clientX;
    let mouseY: number = event.clientY;

    let xInBounds = mouseX >= boundingRect.left && mouseX <= boundingRect.right;
    let yInBounds = mouseY >= boundingRect.top && mouseY <= boundingRect.bottom;

    return xInBounds && yInBounds;
  }

}
