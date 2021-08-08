import { ComponentRef, Injectable } from '@angular/core';
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

  public pop<ComponentType>(component: any): ComponentRef<ComponentType> | null {
    if (this.outlet) return this.outlet.load<ComponentType>(component);
    else return null;
  }

  public unpop(): void {
    if (this.outlet) this.outlet.unload();
  }
}
