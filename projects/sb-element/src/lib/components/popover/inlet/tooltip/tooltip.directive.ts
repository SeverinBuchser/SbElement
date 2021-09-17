import { Directive, HostListener, Input, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from "./tooltip.component";
import { PopperTriggerDirective } from "../popper-trigger.directive";
import { PopperService} from "../../../../services/popper/popper.service";
import { PopoverPosition } from "../../../../models/popover/popover-position";

@Directive({
  selector: '[sbElTooltip]'
})
export class TooltipDirective extends PopperTriggerDirective {

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
        this.popperService.popover<TooltipComponent>(
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
    private popperService: PopperService,
    viewContainerRef: ViewContainerRef
  ) {
    super(viewContainerRef);
    this.popoverPosition = PopoverPosition.TOP;
  }

}
