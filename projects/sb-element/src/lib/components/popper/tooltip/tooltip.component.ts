import { Component, Input } from '@angular/core';
import { PopperPosition } from "../popper/popper-position";
import { ClassNameInputDirective } from '../../../core/';

@Component({
  selector: 'sb-el-tooltip',
  templateUrl: './tooltip.component.html'
})
export class TooltipComponent extends ClassNameInputDirective {

  public rootClass = 'sb-el-tooltip';

  @Input()
  public text: string = '';

  @Input()
  public delay: number = 0;

  @Input()
  public position: string = PopperPosition.TOP;

}
