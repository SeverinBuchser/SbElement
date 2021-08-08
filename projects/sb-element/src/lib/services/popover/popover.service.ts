import { ComponentRef, Injectable } from '@angular/core';
import { PopoverInletDirective } from "../../components/popover/popover-inlet.directive";
import { PopoverOutletComponent } from "../../components/popover/popover-outlet/popover-outlet.component";

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  private outlet?: PopoverOutletComponent;

  constructor() { }

  public subscribe(outlet: PopoverOutletComponent): void {
    this.outlet = outlet;
  }

  public pop<ComponentType>(
    component: any,
    inlet: PopoverInletDirective
  ): ComponentRef<ComponentType> {
    if (this.outlet) return this.outlet.load<ComponentType>(component, inlet);
    else throw new Error("No outlet available!");
  }

  public unpop(): void {
    if (this.outlet) this.outlet.unload();
  }
}
