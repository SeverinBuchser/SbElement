import { ComponentRef, Injectable } from '@angular/core';
import { PopoverInletDirective } from "../../components/popover/inlet/popover-inlet.directive";
import { PopoverOutletComponent } from "../../components/popover/outlet/popover-outlet.component";
import { PopoverDirective } from "../../components/popover/popover.directive";

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  private outlet?: PopoverOutletComponent;
  private inlet?: PopoverInletDirective;
  private isMouseover: boolean = false;
  private isPopped: boolean = false;

  private poppedComponent!: ComponentRef<any>;

  constructor() { }

  public subscribe(outlet: PopoverOutletComponent): void {
    this.outlet = outlet;
    this.subscribeToOutlet();
  }

  public pop<ComponentType extends PopoverDirective>(
    component: any,
    inlet: PopoverInletDirective
  ): ComponentRef<ComponentType> {
    if (!this.isPopped) {
      if (this.outlet) {
        this.inlet = inlet;
        this.subscribeToInlet();

        this.poppedComponent = this.outlet.load<ComponentType>(component, inlet);
        this.isPopped = true;
      } else throw new Error("No outlet available!");
    }
    return this.poppedComponent;
  }

  private subscribeToOutlet(): void {
    if (this.outlet) {
      this.outlet.mouseleave.subscribe((event: MouseEvent) => {
        if (!this.isMouseoverInlet(event)) {
          this.isMouseover = false;
          this.unpop();
        }
      })
    }
  }

  private subscribeToInlet(): void {
    if (this.inlet) {
      this.inlet.mouseleave.subscribe((event: MouseEvent) => {
        if (this.inlet && this.inlet.allowMouseover) {
          if (!this.isMouseoverOutlet(event)) {
            this.isMouseover = false;
            this.unpop();
          }
        } else {
          this.isMouseover = false;
          this.unpop();
        }
      })
    }
  }

  private isMouseoverOutlet(event: MouseEvent): boolean {
    if (this.outlet) {
      return this.isMouseoverBoundingRect(event, this.outlet.boundingRect)
    } else throw new Error('Outlet does not exist!')
  }

  private isMouseoverInlet(event: MouseEvent): boolean {
    if (this.inlet) {
      return this.isMouseoverBoundingRect(event, this.inlet.boundingRect)
    } else throw new Error('Inlet does not exist!')
  }

  private isMouseoverBoundingRect(event: MouseEvent, boundingRect: DOMRect): boolean {
    let mouseX: number = event.clientX;
    let mouseY: number = event.clientY;

    let xInBounds = mouseX >= boundingRect.left && mouseX <= boundingRect.right;
    let yInBounds = mouseY >= boundingRect.top && mouseY <= boundingRect.bottom;

    return xInBounds && yInBounds;
  }

  public unpop(): void {
    if (this.outlet && !this.isMouseover) {
      this.isPopped = false;
      this.outlet.unload();
    }
  }

}
