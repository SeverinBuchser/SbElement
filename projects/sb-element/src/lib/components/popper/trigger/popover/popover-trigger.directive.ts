import { Directive, Input, ViewContainerRef } from '@angular/core';
import { PopperTriggerDirective } from "../popper-trigger.directive";
import { PopoverPosition } from "../../../../models/popover/popover-position";
import { PopperService } from "../../../../services/popper/popper.service";

@Directive({
  selector: '[sbElPopoverTrigger]'
})
export class PopoverTriggerDirective extends PopperTriggerDirective {

  @Input()
  public popoverPosition: string = PopoverPosition.TOP_LEFT;

  @Input()
  public arrow: boolean = true;

  constructor(
    viewContainerRef: ViewContainerRef,
    popperService: PopperService
  ) {
    super(viewContainerRef, popperService);
  }

}
