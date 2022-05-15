import { Directive, Input } from '@angular/core';
import { TriggerableOverlay } from './triggerable-overlay';
import { SbClickTriggerDirective } from './click-trigger.directive';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[sbClickOutsideTrigger]'
})
export class SbClickOutsideTriggerDirective extends SbClickTriggerDirective {

  @Input()
  public triggerable!: TriggerableOverlay;

  private _outsidePointerEventsSubscription: Subscription = Subscription.EMPTY;

  public ngOnInit(): void {
    this._outsidePointerEventsSubscription = this.triggerable.getOutsidePointerEvents()
      .subscribe(() => {
        if (this.triggerable.isVisible()) {
          this.trigger();
        }
      })
  }

  public ngOnDestroy(): void {
    this._outsidePointerEventsSubscription.unsubscribe();
  }

}
