import { Component, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { ThemeService } from "../../../services/theme/theme.service";
import { PopperService } from "../../../services/popper/popper.service";
import { SizeThemeColorInputDirective } from "../../base/style-input/size-theme-color-input.directive";
import { PopperTriggerDirective } from "./../inlet/popper-trigger.directive";
import { PopperOutletDirective } from "./popper-outlet.directive";
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

  @ViewChild(PopperOutletDirective, {static: true})
  public outlet!: PopperOutletDirective;

  public arrow: boolean = true;
  public show: boolean = false;

  @ViewChild('transitionElement')
  private transitionElement!: ElementRef;
  private currentTransitionDuration?: number;

  constructor(
    themeService: ThemeService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private popperService: PopperService
  ) {
    super(themeService);
    this.popperService.subscribe(this);
  }

  public load<ComponentType extends PopoverDirective>(
    component: any,
    trigger: PopperTriggerDirective
  ): ComponentRef<ComponentType> {

    this.direction = trigger.popoverPosition;
    this.arrow = trigger.arrow;
    this.checkDirection();

    let componentRef = this.createComponent<ComponentType>(component);
    componentRef.instance.afterViewInit = () => {
      this.outlet.move(trigger);
    }
    this.currentTransitionDuration = trigger.transitionDuration;
    this.transitionElement.nativeElement.style.transitionDuration = trigger.transitionDuration + 'ms';
    this.show = true;

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
    this.show = false;
    new Promise<void>((resolve) => {
      setTimeout(() => resolve(), this.currentTransitionDuration)
    }).then(() => this.outlet.reset());
  }

  public getClasses(): Array<string> {
    let classes: Array<string> = super.getClasses();
    classes.push(this.direction);
    classes.push(this.arrow ? 'arrow' : '');
    classes.push(this.show ? 'show' : '');
    return classes;
  }

  /**
  * Fade method with visibility and animations, position (top left, top center etc)
   */

}
