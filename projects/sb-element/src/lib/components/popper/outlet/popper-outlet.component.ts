import { Component, ComponentRef, ElementRef, EventEmitter, Type, ViewChild } from '@angular/core';
import { ThemeService } from "../../../services/theme/theme.service";
import { PopperService } from "../../../services/popper/popper.service";
import { SizeThemeInputDirective } from "../../../core/style-input/size-theme-input.directive";
import { PopperOutletDirective } from "./popper-outlet.directive";
import { PopoverPosition } from "../../../models/popover/popover-position";
import { PopperDirective } from "../popper.directive";
import { PopoverTriggerDirective } from "../trigger/popover/popover-trigger.directive";
import { PopupTriggerDirective } from "../trigger/popup/popup-trigger.directive";
import { PopperOutletMoveDirective } from "./popper-outlet-move.directive";

@Component({
  selector: 'sb-el-popper-outlet',
  templateUrl: './popper-outlet.component.html'
})
export class PopperOutletComponent extends SizeThemeInputDirective {

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
  get boundingRect(): DOMRect {return this.toMove.boundingRect};

  @ViewChild('outletRoot')
  private outletRoot!: ElementRef;

  @ViewChild(PopperOutletDirective, {static: true})
  public outlet!: PopperOutletDirective;

  @ViewChild(PopperOutletMoveDirective, {static: true})
  private toMove!: PopperOutletMoveDirective;

  private position: string = PopoverPosition.TOP_LEFT;
  public corner: boolean = false;
  private arrow: boolean = true;
  private transitionDuration?: number;
  private state: 'open' | 'closing' | 'closed' = 'closed';

  constructor(
    themeService: ThemeService,
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
    this.setPosition(trigger.popoverPosition);
    this.arrow = trigger.arrow;
    this.setTransition(trigger.transitionDuration);

    componentRef.instance.align = () => {
      this.toMove.moveTo(trigger.boundingRect, trigger.popoverPosition)
    }
    this.state = 'open';
  }

  public popup(trigger: PopupTriggerDirective): void {
    this.isPopover = false;
    this.setTransition(trigger.transitionDuration);
    this.state = 'open';
  }

  private setTransition(transitionDuration: number): void {
    this.transitionDuration = transitionDuration;
    this.outletRoot.nativeElement.style.transitionDuration = transitionDuration
      + 'ms';
  }

  private setPosition(position: string) {
    this.position = position;
    if (position === PopoverPosition.TOP_LEFT ||
        position === PopoverPosition.TOP_RIGHT ||
        position === PopoverPosition.BOTTOM_LEFT ||
        position === PopoverPosition.BOTTOM_RIGHT )
      this.corner = true;
    else this.corner = false;
  }

  public createComponent<ComponentType extends PopperDirective>(
    component: Type<ComponentType>
  ): ComponentRef<ComponentType> {
    return this.outlet.createComponent<ComponentType>(component);
  }

  public unload(): void {
    this.state = 'closing';
    setTimeout(() => {
      this.outlet.clear()
      this.toMove.moveBack();
      this.state = 'closed';
    }, this.transitionDuration)
  }

  public getClasses(): Array<string> {
    let classes: Array<string> = super.getClasses();
    classes.push(this.state);
    if (this.state !== 'closed') {
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

}
