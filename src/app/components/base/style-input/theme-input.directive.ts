import { Directive, Input } from '@angular/core';
import { ClassNameInputDirective } from './class-name-input.directive';

@Directive({
  selector: '[selector]'
})
export class ThemeInputDirective  extends ClassNameInputDirective {

  @Input()
  public theme: string | null = 'light';

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.theme ? this.rootClass + '--' + this.theme : '');
    return classes;
  }

}
