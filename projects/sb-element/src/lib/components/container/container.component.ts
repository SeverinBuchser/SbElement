import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { ThemeInputDirective } from '../../core';

@Component({
  selector: 'sb-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContainerComponent extends ThemeInputDirective {

  public rootClass = 'sb-container';

  @HostBinding('class')
  get classes(): Array<string> {
    let classes = super.getClasses();
    return classes;
  }

}
