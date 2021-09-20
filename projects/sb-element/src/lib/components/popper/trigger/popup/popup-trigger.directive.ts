import { ComponentRef, Directive, EventEmitter, HostListener } from '@angular/core';
import { PopperOutletComponent } from "../../outlet/popper-outlet.component";
import { PopperDirective } from "../../popper.directive";
import { PopperTriggerDirective } from "../popper-trigger.directive";
import { PopperService } from "../../../../services/popper/popper.service";

@Directive({
  selector: '[selector]'
})
export class PopupTriggerDirective extends PopperTriggerDirective {

  public afterCreation<ComponentType extends PopperDirective>(
    componentRef: ComponentRef<ComponentType>,
    outlet: PopperOutletComponent
  ): void {
    outlet.popup(this);
  }
  
}
