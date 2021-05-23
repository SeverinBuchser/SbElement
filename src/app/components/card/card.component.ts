import { Component } from '@angular/core';
import { SizeThemeColorInputDirective } from '../base/style-input/size-theme-color-input.directive';

@Component({
  selector: 'sb-el-card',
  templateUrl: './card.component.html'
})
export class CardComponent extends SizeThemeColorInputDirective {

  public rootClass: string = 'sb-el-card';

}
