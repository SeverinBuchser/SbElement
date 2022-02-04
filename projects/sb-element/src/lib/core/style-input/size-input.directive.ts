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
    if (this.size && this.rootClass) {
      classes.push(this.rootClass + '--' + this.size);
    }
    return classes;
  }

}
