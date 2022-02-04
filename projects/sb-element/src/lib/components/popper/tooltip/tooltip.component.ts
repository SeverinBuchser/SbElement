import { Component, Input, ViewEncapsulation } from '@angular/core';
import { PopperPosition } from "../popper/popper-position";
import { ClassNameInputDirective } from '../../../core/';

@Component({
  selector: 'sb-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TooltipComponent extends ClassNameInputDirective {

  public rootClass = 'sb-tooltip';

  @Input()
  public text: string = '';

  @Input()
  public delay: number = 0;

  @Input()
  public position: string = PopperPosition.TOP;

}