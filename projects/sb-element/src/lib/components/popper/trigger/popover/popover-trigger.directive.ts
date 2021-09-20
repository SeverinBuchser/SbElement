import { ComponentRef, Directive, Input, ViewContainerRef } from '@angular/core';
import { PopperTriggerDirective } from "../popper-trigger.directive";
import { PopoverPosition } from "../../../../models/popover/popover-position";
import { PopperDirective } from "../../popper.directive";
import { PopperOutletComponent } from "../../outlet/popper-outlet.component";

@Directive({
  selector: '[selector]'
})
export class PopoverTriggerDirective extends PopperTriggerDirective {

  @Input()
  public popoverPosition: string = PopoverPosition.TOP_LEFT;

  @Input()
  public arrow: boolean = true;

  get boundingRect(): DOMRect {
    return this.viewContainerRef.element.nativeElement.getBoundingClientRect();
  }

  constructor(private viewContainerRef: ViewContainerRef) {
    super();
  }

  public afterCreation<ComponentType extends PopperDirective>(
    componentRef: ComponentRef<ComponentType>,
    outlet: PopperOutletComponent
  ): void {
    outlet.popover(componentRef, this);
  }

}
