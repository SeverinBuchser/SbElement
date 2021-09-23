import { Directive, EventEmitter, HostListener, Output, ViewContainerRef } from '@angular/core';
import { PopperOutletComponent } from "../../../outlet/popper-outlet.component";
import { PopoverTriggerDirective } from "../popover-trigger.directive";
import { PopperService } from "../../../../../services/popper/popper.service";

@Directive({
  selector: '[sbElPopoverTriggerClick]'
})
export class PopoverTriggerClickDirective extends PopoverTriggerDirective {

  private click: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @HostListener('document: click', ['$event'])
  handleDocumentClick(event: MouseEvent): void {
    this.click.emit(event)
  }

  @Output() public trigger: EventEmitter<void> = new EventEmitter<void>();
  @HostListener('click', ['$event']) handleClick(event: MouseEvent): void {
    if (!this.popperService.isPopped) event.stopPropagation();
    this.trigger.emit();
  }

  constructor(
    protected popperService: PopperService,
    viewContainerRef: ViewContainerRef
  ) {
    super(viewContainerRef);
  }

  protected subscribe(): void {
    this.subscriptions.push(this.click.subscribe((event: MouseEvent) => {
      if (this.checkUnpop(event, this.outlet)) {
        this.popperService.unpop();
      }
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
