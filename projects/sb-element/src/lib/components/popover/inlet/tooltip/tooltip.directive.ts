import { Directive, HostListener, Input, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from "./tooltip.component";
import { PopoverInletDirective } from "../popover-inlet.directive";
import { PopoverService } from "../../../../services/popover/popover.service";
import { PopoverPosition } from "../../../../models/popover/popover-position";

@Directive({
  selector: '[sbElTooltip]'
})
export class TooltipDirective extends PopoverInletDirective {

  @Input()
  public sbElTooltip: string = '';

  @Input()
  public delay: number = 1000;

  private triggered: boolean = false;

  @HostListener('mouseenter')
  handleMouseenter() {
    this.triggered = true;
    setTimeout(() => {
      if (this.triggered) {
        this.popoverService.pop<TooltipComponent>(
          TooltipComponent, this).instance.text = this.sbElTooltip;
      }
    }, this.delay)
  }

  @HostListener('mouseleave', ['$event'])
  handleMouseleave(event: MouseEvent) {
    super.handleMouseleave(event);
    this.triggered = false;
  }

  constructor(
    private popoverService: PopoverService,
    viewContainerRef: ViewContainerRef
  ) {
    super(viewContainerRef);
    this.popoverPosition = PopoverPosition.TOP;
  }

}
