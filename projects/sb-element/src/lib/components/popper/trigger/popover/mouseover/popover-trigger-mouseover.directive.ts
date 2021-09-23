import { Directive, EventEmitter, HostListener, Input, Output, ViewContainerRef } from '@angular/core';
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
  @HostListener('mouseleave', ['$event'])
  handleMouseleave(event: MouseEvent): void {
    this.mouseleave.emit(event);
  }

  @Output() public trigger: EventEmitter<void> = new EventEmitter<void>();
  @HostListener('mouseenter') handleMouseenter(): void {
    this.trigger.emit();
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
    let overOutlet = this.isMouseoverBoundingRect(event, outlet.boundingRect);
    let overInlet = this.isMouseoverBoundingRect(event, this.boundingRect);
    return (this.allowMouseover && !overInlet && !overOutlet) ||
      (!this.allowMouseover && !overInlet);
  }

  private isMouseoverBoundingRect(
    event: MouseEvent, boundingRect: DOMRect
  ): boolean {
    let mouseX: number = event.clientX;
    let mouseY: number = event.clientY;

    let xInBounds = mouseX >= boundingRect.left && mouseX <= boundingRect.right;
    let yInBounds = mouseY >= boundingRect.top && mouseY <= boundingRect.bottom;

    return xInBounds && yInBounds;
  }
}
