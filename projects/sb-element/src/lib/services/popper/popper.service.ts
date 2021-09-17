import { ComponentRef, Injectable } from '@angular/core';
import { PopperTriggerDirective } from "../../components/popper/trigger/popper-trigger.directive";
import { PopoverTriggerDirective } from "../../components/popper/trigger/popover/popover-trigger.directive";
import { PopperOutletComponent } from "../../components/popper/outlet/popper-outlet.component";
import { PopperDirective } from "../../components/popper/popper.directive";

@Injectable({
  providedIn: 'root'
})
export class PopperService {

  private outlet?: PopperOutletComponent;
  private isPopped: boolean = false;

  private poppedComponent!: ComponentRef<any>;

  public subscribe(outlet: PopperOutletComponent): void {
    this.outlet = outlet;
  }

  public popover<ComponentType extends PopperDirective>(
    component: any,
    trigger: PopoverTriggerDirective
  ): ComponentRef<ComponentType> {
    if (!this.isPopped) {
      if (this.outlet) {
        trigger.prepareTrigger(this.outlet);

        this.poppedComponent = this.outlet.popover<ComponentType>(component, trigger);
        this.isPopped = true;
      } else throw new Error("No outlet available!");
    }
    return this.poppedComponent;
  }

  public pop<ComponentType extends PopperDirective>(
    component: any,
    trigger: PopperTriggerDirective
  ): ComponentRef<ComponentType> {
    if (!this.isPopped) {
      if (this.outlet) {
        this.poppedComponent = this.outlet.pop<ComponentType>(component, trigger);
        this.isPopped = true;
      } else throw new Error("No outlet available!");
    }
    return this.poppedComponent;
  }

  public unpop(): void {
    if (this.outlet) {
      this.isPopped = false;
      this.outlet.unload();
    }
  }

}
