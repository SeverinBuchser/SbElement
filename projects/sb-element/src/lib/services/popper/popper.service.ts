import { ComponentRef, Injectable } from '@angular/core';
import { PopperTriggerDirective } from "../../components/popover/inlet/popper-trigger.directive";
import { PopperOutletComponent } from "../../components/popover/outlet/popper-outlet.component";
import { PopoverDirective } from "../../components/popover/popover.directive";

@Injectable({
  providedIn: 'root'
})
export class PopperService {

  private outlet?: PopperOutletComponent;
  private trigger?: PopperTriggerDirective;
  private isMouseover: boolean = false;
  private isPopped: boolean = false;

  private poppedComponent!: ComponentRef<any>;

  constructor() { }

  public subscribe(outlet: PopperOutletComponent): void {
    this.outlet = outlet;
    this.subscribeToOutlet();
  }

  public popover<ComponentType extends PopoverDirective>(
    component: any,
    trigger: PopperTriggerDirective
  ): ComponentRef<ComponentType> {
    if (!this.isPopped) {
      if (this.outlet) {
        this.trigger = trigger;
        this.subscribeToInlet();

        this.poppedComponent = this.outlet.load<ComponentType>(component, trigger);
        this.isPopped = true;
      } else throw new Error("No outlet available!");
    }
    return this.poppedComponent;
  }

  public pop<ComponentType extends PopoverDirective>(
    component: any
  ): void {
    return;
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
    if (this.trigger) {
      this.trigger.mouseleave.subscribe((event: MouseEvent) => {
        if (this.trigger && this.trigger.allowMouseover) {
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
    if (this.trigger) {
      return this.isMouseoverBoundingRect(event, this.trigger.boundingRect)
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
