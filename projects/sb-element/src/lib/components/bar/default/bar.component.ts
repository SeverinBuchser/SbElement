import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SizeThemeInputDirective } from '../../../core/';

@Component({
  selector: 'sb-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BarComponent extends SizeThemeInputDirective {
  public rootClass = 'sb-bar';

  @Input()
  public side: 'left' | 'right' | 'top' | 'bottom' = 'left';

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.side);
    return classes;
  }
}
