import { Component, ViewEncapsulation } from '@angular/core';
import { ThemeInputDirective } from '../../core';

@Component({
  selector: 'sb-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContainerComponent extends ThemeInputDirective {

  public rootClass = 'sb-container';

}
