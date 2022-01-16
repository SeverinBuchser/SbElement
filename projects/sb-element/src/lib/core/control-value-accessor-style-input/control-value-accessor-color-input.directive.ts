import { Directive, Input } from '@angular/core';
import { ControlValueAccessorClassNameInputDirective } from './control-value-accessor-class-name-input.directive';

@Directive({
  selector: '[selector]'
})
export class ControlValueAccessorColorInputDirective<ValueType> extends ControlValueAccessorClassNameInputDirective<ValueType> {

  @Input()
  public color: string | null = 'primary';

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.color ? this.rootClass + '--' + this.color : '');
    return classes;
  }

}
