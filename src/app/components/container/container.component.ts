import { Component, OnInit } from '@angular/core';
import { ThemeInputDirective } from '../base/style-input/theme-input.directive';

@Component({
  selector: 'sb-el-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent extends ThemeInputDirective {

  constructor() {
    super();
    this.rootClass = 'sb-el-container';
  }

}
