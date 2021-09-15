import { Component, ComponentFactoryResolver, ComponentRef, Input, ViewChild } from '@angular/core';
import { ThemeService } from "../../../services/theme/theme.service";
import { PopoverService } from "../../../services/popover/popover.service";
import { SizeThemeColorInputDirective } from "../../base/style-input/size-theme-color-input.directive";
import { PopoverInletDirective } from "./../inlet/popover-inlet.directive";
import { PopoverOutletDirective } from "./popover-outlet.directive";
import { PopoverDirection } from "../../../models/popover/popover-direction";
import { PopoverDirective } from "../popover.directive";

@Component({
  selector: 'sb-el-popover-outlet',
  templateUrl: './popover-outlet.component.html'
})
export class PopoverOutletComponent extends SizeThemeColorInputDirective {

  public rootClass: string = "sb-el-popover"

  public mouseenter: (event: MouseEvent) => void = () => {};
  public mouseleave: (event: MouseEvent) => void = () => {};

  public direction: PopoverDirection = PopoverDirection.TOP_LEFT;
  public corner: boolean = false;

  private popped: boolean = false;

  @ViewChild(PopoverOutletDirective, {static: true})
  public outlet!: PopoverOutletDirective;

  @Input()
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
    inlet: PopoverInletDirective,
    direction: PopoverDirection = PopoverDirection.TOP_LEFT
  ): ComponentRef<ComponentType> {

    this.direction = direction;
    this.checkDirection();
    let componentRef = this.createComponent<ComponentType>(component);
    componentRef.instance.afterViewInit = () => {
      this.outlet.move(inlet, direction);
    }
    this.popped = true;

    return componentRef
  }

  private checkDirection(): void {
    if (this.direction === PopoverDirection.TOP_LEFT ||
        this.direction === PopoverDirection.TOP_RIGHT ||
        this.direction === PopoverDirection.BOTTOM_LEFT ||
        this.direction === PopoverDirection.BOTTOM_RIGHT )
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
    this.popped = false;
    this.outlet.reset();
  }

  public getClasses(): Array<string> {
    let classes: Array<string> = super.getClasses();
    classes.push(this.direction);
    classes.push(this.arrow ? 'arrow' : '');
    classes.push(this.popped ? 'popped' : '');
    return classes;
  }

  /**
  * Fade method with visibility and animations, position (top left, top center etc)
   */

}
