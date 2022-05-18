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
    if (this.triggerable.onReady.closed) {
      this._subscribeToOusidePointerEvents();
    } else {
      this.triggerable.onReady.subscribe(() => this._subscribeToOusidePointerEvents());
    }
  }

  private _subscribeToOusidePointerEvents(): void {
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

  protected trigger(): void {
    setTimeout(() => {
      if (!this._outsidePointerEventsSubscription.closed) {
        this.triggerable.trigger();
      }
    }, this.delay);
  }

}
