import { Directive, HostListener } from '@angular/core';
import { SbTriggerDirective } from './trigger.directive';

@Directive({
  selector: '[sbHoverTrigger]'
})
export class SbHoverTriggerDirective extends SbTriggerDirective {

  @HostListener('mouseenter', ['$event'])
  private handleMouseEnter(event: PointerEvent) {
    this.trigger();
  }

  @HostListener('mouseleave', ['$event'])
  private handleMouseLeave(event: PointerEvent) {
    this.trigger();
  }

}
