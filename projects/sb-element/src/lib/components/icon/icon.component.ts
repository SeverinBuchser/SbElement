import { Component } from '@angular/core';
import { SizeColorInputDirective } from '../base/style-input/size-color-input.directive';

@Component({
  selector: 'sb-el-icon',
  templateUrl: './icon.component.html'
})
export class IconComponent extends SizeColorInputDirective {

  constructor() {
    super();
    this.rootClass = 'sb-el-icon';
  }

}