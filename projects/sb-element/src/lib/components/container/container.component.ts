import { Component, ViewEncapsulation } from '@angular/core';
import { SizeThemeInputDirective } from '../../core/style-input/size-theme-input.directive';

@Component({
  selector: 'sb-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContainerComponent extends SizeThemeInputDirective {

  public rootClass = 'sb-container';

}
