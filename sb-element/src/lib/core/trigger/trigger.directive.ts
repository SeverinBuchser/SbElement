import { Directive, Input } from '@angular/core';
import { Triggerable } from "./triggerable";

@Directive({
  selector: '[sbTrigger]'
})
export class SbTriggerDirective {

  @Input()
  public triggerable!: Triggerable;

  @Input()
  public delay: number = 0;

  protected trigger(): void {
    let timeout = setTimeout(() => {
      this.triggerable.trigger();
      clearTimeout(timeout);
    }, this.delay);
  }

}
