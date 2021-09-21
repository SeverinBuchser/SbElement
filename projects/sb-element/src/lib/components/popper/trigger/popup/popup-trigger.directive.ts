import { Directive } from '@angular/core';
import { PopperTriggerDirective } from "../popper-trigger.directive";

@Directive({
  selector: '[selector]'
})
export class PopupTriggerDirective extends PopperTriggerDirective {

  public afterComponentViewInit(): void {
    this.outlet.popup(this);
  }

}
