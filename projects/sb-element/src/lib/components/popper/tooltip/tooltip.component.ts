import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { PopperPosition } from "../popper/popper-position";
import { mixinClassName } from '../../../core';

const SbTooltipCore = mixinClassName(
  class {
    constructor(
      public _elementRef: ElementRef) {}
  }, 'sb-tooltip'
);

@Component({
  selector: 'sb-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SbTooltipComponent extends SbTooltipCore {

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
