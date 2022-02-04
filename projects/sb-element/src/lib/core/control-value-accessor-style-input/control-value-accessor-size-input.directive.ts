import { Directive, Input } from '@angular/core';
import { ControlValueAccessorClassNameInputDirective } from './control-value-accessor-class-name-input.directive';

@Directive({
  selector: '[selector]'
})
export class ControlValueAccessorSizeInputDirective<ValueType> extends ControlValueAccessorClassNameInputDirective<ValueType> {

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
