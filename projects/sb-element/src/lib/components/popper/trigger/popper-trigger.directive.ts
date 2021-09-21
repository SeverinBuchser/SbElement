import { ComponentRef, Directive, Input } from '@angular/core';
import { Subscription } from "rxjs";
import { PopperOutletComponent } from "../outlet/popper-outlet.component";
import { PopperDirective } from "../popper.directive";

@Directive({
  selector: '[selector]'
})
export class PopperTriggerDirective {

  protected componentRef!: ComponentRef<PopperDirective>;
  protected outlet!: PopperOutletComponent;

  protected subscriptions: Array<Subscription> = new Array<Subscription>();

  @Input()
  public transitionDuration: number = 100;

  public prepare<ComponentType extends PopperDirective>(
    outlet: PopperOutletComponent,
    componentRef: ComponentRef<ComponentType>
  ): void {
    this.outlet = outlet;
    this.componentRef = componentRef;

    this.unsubscribe();
    this.subscribe();
    this.afterComponentViewInit();
  }

  private unsubscribe(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = new Array<Subscription>();
  }

  protected subscribe(): void {}

  public afterComponentViewInit(): void {}

  public unprepare(): void {
    this.unsubscribe();
  }
}
