import { ComponentFactoryResolver, ComponentRef, Directive, Type, ViewContainerRef } from '@angular/core';
import { PopperDirective } from "../popper.directive";

@Directive({
  selector: '[sbElPopperOutlet]'
})
export class PopperOutletDirective {

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  public clear(): void {
    this.viewContainerRef.clear();
  }

  public createComponent<ComponentType extends PopperDirective>(
    component: Type<ComponentType>
  ): ComponentRef<ComponentType> {
    let componentFactory = this.componentFactoryResolver
      .resolveComponentFactory<ComponentType>(component);
    return this.viewContainerRef
      .createComponent<ComponentType>(componentFactory);
  }
}
