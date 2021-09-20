import { ComponentRef, Injectable } from '@angular/core';
import { PopperTriggerDirective } from "../../components/popper/trigger/popper-trigger.directive";
import { PopperOutletComponent } from "../../components/popper/outlet/popper-outlet.component";
import { PopperDirective } from "../../components/popper/popper.directive";

@Injectable({
  providedIn: 'root'
})
export class PopperService {

  private outlet?: PopperOutletComponent;
  private _isPopped: boolean = false;
  get isPopped(): boolean {return this._isPopped;}

  private componentRef!: ComponentRef<any>;

  public subscribe(outlet: PopperOutletComponent): void {
    this.outlet = outlet;
  }

  public pop<ComponentType extends PopperDirective>(
    component: any,
    trigger: PopperTriggerDirective
  ): ComponentRef<ComponentType> {
    if (!this._isPopped) {
      if (this.outlet) {
        trigger.prepareTrigger(this.outlet);
        this.componentRef = this.outlet.createComponent(component);
        trigger.afterCreation(this.componentRef, this.outlet);
        this._isPopped = true;
      } else throw new Error("No outlet available!");
    }
    return this.componentRef;
  }

  public unpop(): void {
    if (this.outlet) {
      this._isPopped = false;
      console.log("hi")
      this.outlet.unload();
    }
  }

}