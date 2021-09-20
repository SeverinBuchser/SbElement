import { ComponentRef, Directive, Input } from '@angular/core';
import { Subscription } from "rxjs";
import { PopperOutletComponent } from "../outlet/popper-outlet.component";
import { PopperDirective } from "../popper.directive";

@Directive({
  selector: '[selector]'
})
export class PopperTriggerDirective {

  protected triggerSubscription?: Subscription;
  protected outletSubscription?: Subscription;

  @Input()
  public transitionDuration: number = 100;

  public prepareTrigger(outlet: PopperOutletComponent): void {
    this.unsubscribe();
    this.subscribe(outlet);
  };

  private unsubscribe(): void {
    this.triggerSubscription?.unsubscribe();
    this.outletSubscription?.unsubscribe();
  }

  protected subscribe(outlet: PopperOutletComponent): void {}

  public afterCreation<ComponentType extends PopperDirective>(
    componentRef: ComponentRef<ComponentType>,
    outlet: PopperOutletComponent
  ): void {}

}
