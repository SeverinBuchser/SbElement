import { Directive, HostListener } from '@angular/core';
import { SbTriggerDirective } from "./trigger.directive";

@Directive({
  selector: '[sbClickTrigger]'
})
export class SbClickTriggerDirective extends SbTriggerDirective {

  @HostListener('click', ['$event'])
  private handleClick(event: PointerEvent) {
    event.stopPropagation();
    this.trigger();
  }

}
