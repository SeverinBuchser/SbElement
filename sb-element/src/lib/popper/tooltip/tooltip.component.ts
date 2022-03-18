import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { PopperPosition } from "../popper/popper-position";
import { mixinClassName } from '../../core';

const SbTooltipCore = mixinClassName(
  class {
    constructor(public _elementRef: ElementRef) {}
  }, 'sb-tooltip'
);

@Component({
  selector: 'sb-tooltip',
  templateUrl: './tooltip.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SbTooltipComponent extends SbTooltipCore {

  @Output()
  public showStart: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public showEnd: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public hideStart: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public hideEnd: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  public visible: boolean = false;

  @Input()
  public text: string = '';

  @Input()
  public delay: number = 0;

  @Input()
  public position: string = PopperPosition.TOP;

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

}
