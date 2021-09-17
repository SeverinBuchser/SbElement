import { Directive, Input, ViewContainerRef } from '@angular/core';
import { PopperOutletComponent } from "../outlet/popper-outlet.component";
import { PopperService } from "../../../services/popper/popper.service";
import { Subscription } from "rxjs";

@Directive({
  selector: '[sbElPopperTrigger]'
})
export class PopperTriggerDirective {

  protected triggerSubscription?: Subscription;
  protected outletSubscription?: Subscription;

  @Input()
  public transitionDuration: number = 100;

  constructor(
    private viewContainerRef: ViewContainerRef,
    protected popperService: PopperService
  ) {

  }

  get boundingRect(): DOMRect {
    return this.viewContainerRef.element.nativeElement.getBoundingClientRect();
  }

  public prepareTrigger(outlet: PopperOutletComponent): void {}

}
