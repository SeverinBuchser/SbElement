import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ThemeService } from "../../services/theme/theme.service";
import { PopoverService } from "../../services/popover/popover.service";
import { SizeThemeColorInputDirective } from "../base/style-input/size-theme-color-input.directive";
import { PopoverInletDirective } from "./popover-inlet.directive";
import { PopoverOutletDirective } from "./popover-outlet.directive";

@Component({
  selector: 'sb-el-popover',
  templateUrl: './popover.component.html'
})
export class PopoverComponent extends SizeThemeColorInputDirective {

  public rootClass: string = "sb-el-popover"

  public mouseenter: (event: MouseEvent) => void = (event: MouseEvent) => {};
  public mouseleave: (event: MouseEvent) => void = (event: MouseEvent) => {};

  @ViewChild(PopoverOutletDirective, {static: true})
  set outlet(outlet: PopoverOutletDirective) {
    this.viewContainerRef = outlet.viewContainerRef;
  }

  private viewContainerRef!: ViewContainerRef;

  constructor(
    themeService: ThemeService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private popoverService: PopoverService
  ) {
    super(themeService);
    this.popoverService.subscribe(this);
  }

  public load<ComponentType>(
    component: any,
    inlet: PopoverInletDirective
  ): ComponentRef<ComponentType> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<ComponentType>(component)
    this.setPosition(inlet.getPosition());
    return this.viewContainerRef.createComponent<ComponentType>(componentFactory);
  }

  get popoverElement(): HTMLElement {
    return this.viewContainerRef.element.nativeElement.parentElement;
  }

  public unload(): void {
    this.viewContainerRef.clear();
    this.resetPosition();
  }

  private resetPosition(): void {
    let element: HTMLElement = this.viewContainerRef.element.nativeElement.parentElement;
    element.style.transform = "translate(0px, 0px)";
  }

  private setPosition(positionToReach: DOMRect): void {
    let element: HTMLElement = this.viewContainerRef.element.nativeElement.parentElement;
    let positionToSet: DOMRect = element.getBoundingClientRect();

    let diffX = positionToReach.left - positionToSet.left;
    let diffY = positionToReach.top - positionToSet.top;

    element.style.transform = "translate(" + diffX + "px, " + diffY + "px" + ")";
  }

}
