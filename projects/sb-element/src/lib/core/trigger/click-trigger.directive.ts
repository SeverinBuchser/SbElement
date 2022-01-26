import { Directive, HostListener } from '@angular/core';
import { TriggerDirective } from "./trigger.directive";

@Directive({
  selector: '[sbElClickTrigger]'
})
export class ClickTriggerDirective extends TriggerDirective {

  @HostListener('click', ['$event'])
  private handleClick(event: PointerEvent) {
    event.stopPropagation();
    this.trigger();
  }

}
