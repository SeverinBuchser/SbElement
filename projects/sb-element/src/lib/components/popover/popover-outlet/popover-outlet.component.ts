import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PopoverService } from "../../../services/popover/popover.service";
import { PopoverOutletDirective } from "../popover-outlet.directive";

@Component({
  selector: 'sb-el-popover-outlet',
  templateUrl: './popover-outlet.component.html'
})
export class PopoverOutletComponent {

  @ViewChild(PopoverOutletDirective, {static: true})
  set outlet(outlet: PopoverOutletComponent) {
    this.viewContainerRef = outlet.viewContainerRef;
  }

  private viewContainerRef!: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private popoverService: PopoverService
  ) {
    this.popoverService.subscribe(this);
  }

  public load<ComponentType>(
    component: any,
    position: DOMRect
  ): ComponentRef<ComponentType> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<ComponentType>(component)
    this.setPosition(position);
    return this.viewContainerRef.createComponent<ComponentType>(componentFactory);
  }

  public unload(): void {
    this.viewContainerRef.clear();
    this.resetPosition();
  }

  private resetPosition(): void {
    let element: HTMLElement = this.viewContainerRef.element.nativeElement.parentElement;
    element.style.transform = "translate(0px, 0px)";
  }

  private setPosition(positionToReach: DOMRect): void {
    let element: HTMLElement = this.viewContainerRef.element.nativeElement.parentElement;
    let positionToSet: DOMRect = element.getBoundingClientRect();

    let diffX = positionToReach.left - positionToSet.left;
    let diffY = positionToReach.top - positionToSet.top;

    element.style.transform = "translate(" + diffX + "px, " + diffY + "px" + ")";
  }

}
