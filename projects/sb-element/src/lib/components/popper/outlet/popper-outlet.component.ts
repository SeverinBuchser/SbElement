import { Component, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { ThemeService } from "../../../services/theme/theme.service";
import { PopperService } from "../../../services/popper/popper.service";
import { SizeThemeColorInputDirective } from "../../base/style-input/size-theme-color-input.directive";
import { PopperTriggerDirective } from "./../trigger/popper-trigger.directive";
import { PopperOutletDirective } from "./popper-outlet.directive";
import { PopoverPosition } from "../../../models/popover/popover-position";
import { PopperDirective } from "../popper.directive";
import { PopoverTriggerDirective } from "../trigger/popover/popover-trigger.directive";
import { PopupTriggerDirective } from "../trigger/popup/popup-trigger.directive";

@Component({
  selector: 'sb-el-popper-outlet',
  templateUrl: './popper-outlet.component.html'
})
export class PopperOutletComponent extends SizeThemeColorInputDirective {

  public rootClass: string = "sb-el-popper"

  public isPopover: boolean = false;

  public mouseleave: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  public handleMouseleave(event: MouseEvent): void {
    this.mouseleave.emit(event);
  }

  public click: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  public handleClick(event: MouseEvent): void {
    this.click.emit(event);
  }
  get boundingRect(): DOMRect {return this.outlet.boundingRect};


  @ViewChild(PopperOutletDirective, {static: true})
  public outlet!: PopperOutletDirective;

  public position: string = PopoverPosition.TOP_LEFT;
  public corner: boolean = false;
  public arrow: boolean = true;


  @ViewChild('transitionElement')
  private transitionElement!: ElementRef;
  private currentTransitionDuration?: number;
  public show: boolean = false;

  constructor(
    themeService: ThemeService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private popperService: PopperService
  ) {
    super(themeService);
    this.popperService.subscribe(this);
  }

  public popover<ComponentType extends PopperDirective>(
    componentRef: ComponentRef<ComponentType>,
    trigger: PopoverTriggerDirective
  ): void {
    this.isPopover = true;
    this.position = trigger.popoverPosition;
    this.checkPosition();
    this.arrow = trigger.arrow;
    this.setTransition(trigger);

    componentRef.instance.afterViewInit = () => {
      this.outlet.alignToTrigger(trigger.boundingRect, trigger.popoverPosition)
    }

    this.show = true;
  }

  public popup(trigger: PopupTriggerDirective): void {
    this.isPopover = false;
    this.setTransition(trigger);
    this.show = true;
  }

  private setTransition(trigger: PopperTriggerDirective): void {
    this.currentTransitionDuration = trigger.transitionDuration;
    this.transitionElement.nativeElement.style.transitionDuration = trigger.transitionDuration + 'ms';
  }

  private checkPosition(): void {
    if (this.position === PopoverPosition.TOP_LEFT ||
        this.position === PopoverPosition.TOP_RIGHT ||
        this.position === PopoverPosition.BOTTOM_LEFT ||
        this.position === PopoverPosition.BOTTOM_RIGHT )
      this.corner = true;
    else this.corner = false;
  }

  public createComponent<ComponentType extends PopperDirective>(
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
    if (this.show) {
      classes.push('show')
      if (this.isPopover) {
        classes.push('popover')
        classes.push(this.position);
        classes.push(this.arrow ? 'arrow' : '');
      } else {
        classes.push('popper')
      }
    }
    return classes;
  }

  /**
  * Fade method with visibility and animations, position (top left, top center etc)
   */

}
