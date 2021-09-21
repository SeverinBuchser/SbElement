import { Directive, EventEmitter, HostListener, Input, ViewContainerRef } from '@angular/core';
import { PopperOutletComponent } from "../../../outlet/popper-outlet.component";
import { PopperService } from "../../../../../services/popper/popper.service";
import { PopoverTriggerDirective } from "../../popover/popover-trigger.directive";

@Directive({
  selector: '[sbElPopoverTriggerMouseover]'
})
export class PopoverTriggerMouseoverDirective extends PopoverTriggerDirective {

  @Input()
  public allowMouseover: boolean = false;

  private mouseleave: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @HostListener('mouseleave', ['$event']) handleMouseleave(event: MouseEvent): void {
    this.mouseleave.emit(event);
  }

  constructor(
    protected popperService: PopperService,
    viewContainerRef: ViewContainerRef
  ) {
    super(viewContainerRef);
  }

  protected subscribe(): void {
    this.subscriptions.push(this.mouseleave.subscribe(
      (event: MouseEvent) => {
        if (this.checkUnpop(event, this.outlet)) this.popperService.unpop();
      }
    ))

    this.subscriptions.push(this.outlet.mouseleave.subscribe(
      (event: MouseEvent) => {
        if (this.checkUnpop(event, this.outlet)) this.popperService.unpop();
      }
    ))
  }

  private checkUnpop(event: MouseEvent, outlet: PopperOutletComponent) {
    let isMouseoverOutlet = this.isMouseoverOutlet(event, outlet);
    let isMouseoverInlet = this.isMouseoverInlet(event);
    return (this.allowMouseover && !isMouseoverInlet && !isMouseoverOutlet) ||
      (!this.allowMouseover && !isMouseoverInlet);
  }

  private isMouseoverOutlet(event: MouseEvent, outlet: PopperOutletComponent): boolean {
    return this.isMouseoverBoundingRect(event, outlet.boundingRect)
  }

  private isMouseoverInlet(event: MouseEvent): boolean {
    return this.isMouseoverBoundingRect(event, this.boundingRect)
  }

  private isMouseoverBoundingRect(event: MouseEvent, boundingRect: DOMRect): boolean {
    let mouseX: number = event.clientX;
    let mouseY: number = event.clientY;

    let xInBounds = mouseX >= boundingRect.left && mouseX <= boundingRect.right;
    let yInBounds = mouseY >= boundingRect.top && mouseY <= boundingRect.bottom;

    return xInBounds && yInBounds;
  }
}
