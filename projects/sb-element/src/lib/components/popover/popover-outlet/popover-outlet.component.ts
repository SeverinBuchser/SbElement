import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { PopoverService } from "../../../services/popover/popover.service";
import { PopoverOutletDirective } from "../popover-outlet.directive";

@Component({
  selector: 'sb-el-popover-outlet',
  templateUrl: './popover-outlet.component.html'
})
export class PopoverOutletComponent {

  @ViewChild(PopoverOutletDirective)
  set outlet(outlet: PopoverOutletComponent) {
    this.viewContainerRef = outlet.viewContainerRef;
  }

  private viewContainerRef?: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private popoverService: PopoverService
  ) {
    this.popoverService.subscribe(this);
  }

  public load(component: any): void {
    if (this.viewContainerRef) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component)
      this.viewContainerRef.createComponent<any>(componentFactory);
    }
  }

  public unload(): void {
    if (this.viewContainerRef) this.viewContainerRef.clear();
  }

}
