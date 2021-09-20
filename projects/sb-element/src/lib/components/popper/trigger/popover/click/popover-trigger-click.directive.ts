import { Directive, ViewContainerRef } from '@angular/core';
import { PopoverTriggerDirective } from "../popover-trigger.directive";

@Directive({
  selector: '[sbElPopperTriggerClick]'
})
export class PopoverTriggerClickDirective extends PopoverTriggerDirective {

  constructor(viewContainerRef: ViewContainerRef) {
    super(viewContainerRef);
  }

}
