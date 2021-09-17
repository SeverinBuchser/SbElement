import { Directive, HostListener, Input, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from "./tooltip.component";
import { PopoverTriggerMouseoverDirective } from "../popover-trigger-mouseover.directive";
import { PopperService} from "../../../../../../services/popper/popper.service";
import { PopoverPosition } from "../../../../../../models/popover/popover-position";

@Directive({
  selector: '[sbElTooltip]'
})
export class TooltipDirective extends PopoverTriggerMouseoverDirective {

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
    popperService: PopperService,
    viewContainerRef: ViewContainerRef
  ) {
    super(viewContainerRef, popperService);
    this.popoverPosition = PopoverPosition.TOP;
  }

}
