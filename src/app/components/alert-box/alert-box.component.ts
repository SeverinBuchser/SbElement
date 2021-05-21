import { Component } from '@angular/core';
import { SizeThemeColorInputDirective } from '../base/style-input/size-theme-color-input.directive';

@Component({
  selector: 'sb-el-alert-box',
  templateUrl: './alert-box.component.html'
})
export class AlertBoxComponent extends SizeThemeColorInputDirective {

  public rootClass: string = 'sb-el-alert-box';

}
