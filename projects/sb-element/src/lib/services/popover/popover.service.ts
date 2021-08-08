import { Injectable } from '@angular/core';
import { PopoverOutletComponent } from "../../components/popover/popover-outlet/popover-outlet.component";

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  private outlets: Array<PopoverOutletComponent> = new Array<PopoverOutletComponent>();

  constructor() { }

  public subscribe(outlet: PopoverOutletComponent): void {
    this.outlets.push(outlet)
  }

  public pop(component: any): void {
    this.outlets.forEach((outlet: PopoverOutletComponent) => {
      outlet.load(component);
    })
  }

  public unpop(): void {
    this.outlets.forEach((outlet: PopoverOutletComponent) => {
      outlet.unload();
    })
  }
}
