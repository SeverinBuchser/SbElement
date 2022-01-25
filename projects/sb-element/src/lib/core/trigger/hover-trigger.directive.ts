import { Directive, HostListener } from '@angular/core';
import { TriggerDirective } from './trigger.directive';

@Directive({
  selector: '[sbElHoverTrigger]'
})
export class HoverTriggerDirective extends TriggerDirective {

  @HostListener('mouseenter', ['$event'])
  private handleMouseEnter(event: PointerEvent) {
    this.trigger();
  }

  @HostListener('mouseleave', ['$event'])
  private handleMouseLeave(event: PointerEvent) {
    this.trigger();
  }

}
