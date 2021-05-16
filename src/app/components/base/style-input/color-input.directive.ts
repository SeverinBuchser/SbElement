import { Directive, Input } from '@angular/core';
import { ClassNameInputDirective } from './class-name-input.directive';

@Directive({
  selector: '[selector]'
})
export class ColorInputDirective extends ClassNameInputDirective {

  @Input()
  public color: string | null = 'primary';

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.color ? this.rootClass + '--' + this.color : '');
    return classes;
  }

}
