import { Directive, Input } from '@angular/core';
import { ClassNameInputDirective } from './class-name-input.directive';

@Directive({
  selector: '[selector]'
})
export class SizeThemeInputDirective extends ClassNameInputDirective {

  @Input()
  public size: string | null = 'd';

  @Input()
  public theme: string | null = 'light';

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.size ? this.rootClass + '--' + this.size : '');
    classes.push(this.theme ? this.rootClass + '--' + this.theme : '');
    return classes;
  }

}
