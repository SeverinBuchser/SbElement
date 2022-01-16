import { Directive, Input } from '@angular/core';
import { ClassNameInputDirective } from './class-name-input.directive';

@Directive({
  selector: '[selector]'
})
export class SizeInputDirective extends ClassNameInputDirective {

  @Input()
  public size: string | null = 'd';

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.size ? this.rootClass + '--' + this.size : '');
    return classes;
  }

}
