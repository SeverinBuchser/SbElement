import { Component } from '@angular/core';
import { PopperDirective } from '../../popper.directive';

@Component({
  selector: 'sb-el-tooltip',
  templateUrl: './tooltip.component.html'
})
export class TooltipComponent extends PopperDirective {

  public text: string = '';

}
