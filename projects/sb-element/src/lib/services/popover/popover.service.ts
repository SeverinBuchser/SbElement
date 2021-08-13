import { ComponentRef, Injectable } from '@angular/core';
import { PopoverInletDirective } from "../../components/popover/popover-inlet.directive";
import { PopoverComponent } from "../../components/popover/popover.component";

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  private outlet?: PopoverComponent;
  private isPoped: boolean = false;

  public allowMouseover: boolean = true;
  public mouseIsOver: boolean = false;

  constructor() { }

  public subscribe(outlet: PopoverComponent): void {
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

  public pop<ComponentType>(
    component: any,
    inlet: PopoverInletDirective
  ): ComponentRef<ComponentType> {
    if (this.outlet) {
      if (!this.isPoped) {
        this.isPoped = true;
        return this.outlet.load<ComponentType>(component, inlet);
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
