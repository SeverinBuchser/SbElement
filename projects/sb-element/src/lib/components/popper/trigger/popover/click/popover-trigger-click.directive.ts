import { Directive, EventEmitter, HostListener, ViewContainerRef } from '@angular/core';
import { PopperOutletComponent } from "../../../outlet/popper-outlet.component";
import { PopoverTriggerDirective } from "../popover-trigger.directive";
import { PopperService } from "../../../../../services/popper/popper.service";

@Directive({
  selector: '[sbElPopoverTriggerClick]'
})
export class PopoverTriggerClickDirective extends PopoverTriggerDirective {

  private isFirstClick: boolean = true;

  private click: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @HostListener('document: click', ['$event']) handleClick(event: MouseEvent): void {
    this.click.emit(event)
  }

  constructor(
    protected popperService: PopperService,
    viewContainerRef: ViewContainerRef
  ) {
    super(viewContainerRef);
  }

  protected subscribe(outlet: PopperOutletComponent): void {
    this.triggerSubscription = this.click.subscribe((event: MouseEvent) => {
      if (this.isFirstClick) this.isFirstClick = false;
      else if (this.checkUnpop(event, outlet)) {
        this.popperService.unpop();
        this.isFirstClick = true;
      }
    })
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
