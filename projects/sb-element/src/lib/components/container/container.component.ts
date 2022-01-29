import { Component } from '@angular/core';
import { ThemeInputDirective } from '../../core';

@Component({
  selector: 'sb-container',
  templateUrl: './container.component.html'
})
export class ContainerComponent extends ThemeInputDirective {

  public rootClass = 'sb-container';

}
