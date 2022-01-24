import { Component, Input } from '@angular/core';
import { SizeThemeInputDirective } from '../../../core/';

@Component({
  selector: 'sb-el-bar',
  templateUrl: './bar.component.html'
})
export class BarComponent extends SizeThemeInputDirective {
  public rootClass = 'sb-el-bar';

  @Input()
  public side: 'left' | 'right' | 'top' | 'bottom' = 'left';

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.side);
    return classes;
  }
}
