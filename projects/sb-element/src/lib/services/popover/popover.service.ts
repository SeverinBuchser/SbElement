import { ComponentRef, Injectable } from '@angular/core';
import { PopoverInletDirective } from "../../components/popover/inlet/popover-inlet.directive";
import { PopoverOutletComponent } from "../../components/popover/outlet/popover-outlet.component";
import { PopoverDirective } from "../../components/popover/popover.directive";
import { PopoverDirection } from "../../models/popover/popover-direction";

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  private outlet?: PopoverOutletComponent;
  private isPoped: boolean = false;

  public allowMouseover: boolean = true;
  public mouseIsOver: boolean = false;

  constructor() { }

  public subscribe(outlet: PopoverOutletComponent): void {
    this.outlet = outlet;
    if (this.allowMouseover) {
      this.outlet.mouseenter = () => this.mouseIsOver = true;
      this.outlet.mouseleave = () => {
        this.mouseIsOver = false;
        if (this.outlet && this.isPoped) {
          this.outlet.unload();
          this.isPoped = false;
        }
      }
    }
  }

  public pop<ComponentType extends PopoverDirective>(
    component: any,
    inlet: PopoverInletDirective,
    direction: PopoverDirection = PopoverDirection.TOP_LEFT
  ): ComponentRef<ComponentType> {
    if (this.outlet) {
      if (!this.isPoped) {
        this.isPoped = true;
        return this.outlet.load<ComponentType>(component, inlet, direction);
      } else throw new Error("Popover is already poped!");
    }
    else throw new Error("No outlet available!");
  }

  public unpop(): void {
    if (!this.allowMouseover) {
      this.unpopDisallowMouseover();
    } else {
      this.unpopAllowMouseover();
    }
  }

  private unpopDisallowMouseover(): void {
    if (this.outlet && this.isPoped) {
      this.outlet.unload();
      this.isPoped = false;
    }
  }

  private unpopAllowMouseover(): void {
    setTimeout(() => {
      if (this.outlet && !this.mouseIsOver && this.isPoped) {
        this.outlet.unload();
        this.isPoped = false;
      }
    }, 0);
  }

}
