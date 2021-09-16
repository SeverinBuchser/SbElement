import { Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, ViewChild } from '@angular/core';
import { ThemeService } from "../../../services/theme/theme.service";
import { PopoverService } from "../../../services/popover/popover.service";
import { SizeThemeColorInputDirective } from "../../base/style-input/size-theme-color-input.directive";
import { PopoverInletDirective } from "./../inlet/popover-inlet.directive";
import { PopoverOutletDirective } from "./popover-outlet.directive";
import { PopoverPosition } from "../../../models/popover/popover-position";
import { PopoverDirective } from "../popover.directive";

@Component({
  selector: 'sb-el-popover-outlet',
  templateUrl: './popover-outlet.component.html'
})
export class PopoverOutletComponent extends SizeThemeColorInputDirective {

  public rootClass: string = "sb-el-popover"

  public mouseleave: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  public handleMouseleave(event: MouseEvent): void {
    this.mouseleave.emit(event);
  }
  get boundingRect(): DOMRect {return this.outlet.boundingRect};

  public direction: string = PopoverPosition.TOP_LEFT;
  public corner: boolean = false;

  @ViewChild(PopoverOutletDirective, {static: true})
  public outlet!: PopoverOutletDirective;

  public arrow: boolean = true;

  constructor(
    themeService: ThemeService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private popoverService: PopoverService
  ) {
    super(themeService);
    this.popoverService.subscribe(this);
  }

  public load<ComponentType extends PopoverDirective>(
    component: any,
    inlet: PopoverInletDirective
  ): ComponentRef<ComponentType> {

    this.direction = inlet.popoverPosition;
    this.arrow = inlet.arrow;
    this.checkDirection();

    let componentRef = this.createComponent<ComponentType>(component);
    componentRef.instance.afterViewInit = () => {
      this.outlet.move(inlet);
    }

    return componentRef
  }

  private checkDirection(): void {
    if (this.direction === PopoverPosition.TOP_LEFT ||
        this.direction === PopoverPosition.TOP_RIGHT ||
        this.direction === PopoverPosition.BOTTOM_LEFT ||
        this.direction === PopoverPosition.BOTTOM_RIGHT )
      this.corner = true;
    else this.corner = false;
  }

  private createComponent<ComponentType extends PopoverDirective>(
    component: any
  ): ComponentRef<ComponentType> {
    let componentFactory = this.componentFactoryResolver
      .resolveComponentFactory<ComponentType>(component);
    return this.outlet.viewContainerRef
      .createComponent<ComponentType>(componentFactory);
  }

  public unload(): void {
    this.outlet.reset();
  }

  public getClasses(): Array<string> {
    let classes: Array<string> = super.getClasses();
    classes.push(this.direction);
    classes.push(this.arrow ? 'arrow' : '');
    return classes;
  }

  /**
  * Fade method with visibility and animations, position (top left, top center etc)
   */

}
