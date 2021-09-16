import { Component } from '@angular/core';
import { PopoverDirective } from '../../popover.directive';

@Component({
  selector: 'sb-el-tooltip',
  templateUrl: './tooltip.component.html'
})
export class TooltipComponent extends PopoverDirective {

  public text: string = '';

}
