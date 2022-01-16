import { Component } from '@angular/core';
import { SizeThemeInputDirective } from '../../core/style-input/size-theme-input.directive';

@Component({
  selector: 'sb-el-container',
  templateUrl: './container.component.html'
})
export class ContainerComponent extends SizeThemeInputDirective {

  public rootClass = 'sb-el-container';

}
