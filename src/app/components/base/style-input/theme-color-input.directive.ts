import { Directive, Input } from '@angular/core';
import { ClassNameInputDirective } from './class-name-input.directive';

@Directive({
  selector: '[selector]'
})
export class ThemeColorInputDirective extends ClassNameInputDirective {

  @Input()
  public theme: string | null = 'light';

  @Input()
  public color: string | null = 'primary';

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.theme && this.color ?
      this.rootClass + '--' + this.theme + '-' + this.color : '');
    return classes;
  }

}
