import { Directive, Input } from '@angular/core';
import { ControlValueAccessorClassNameInputDirective } from './control-value-accessor-class-name-input.directive';

@Directive({
  selector: '[selector]'
})
export class ControlValueAccessorThemeColorInputDirective<ValueType> extends ControlValueAccessorClassNameInputDirective<ValueType> {

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
