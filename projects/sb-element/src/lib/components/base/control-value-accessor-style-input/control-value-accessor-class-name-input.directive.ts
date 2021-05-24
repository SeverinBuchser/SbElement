import { Directive, Input } from '@angular/core';
import { ControlValueAccessorBaseDirective } from '../control-value-accessor/control-value-accessor.base.directive';

@Directive({
  selector: '[selector]'
})
export class ControlValueAccessorClassNameInputDirective<ValueType> extends ControlValueAccessorBaseDirective<ValueType> {

  public rootClass: string = '';

  private _extraClasses: Array<string> = new Array<string>();
  @Input()
  set extraClasses(extraClasses: string | Array<string>) {
    if (Array.isArray(extraClasses)) this._extraClasses = extraClasses;
    else {
      this._extraClasses = extraClasses.split(' ').filter(className => {
        return className !== '';
      });
    }
  }

  public getClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push(this.rootClass);
    this._extraClasses.forEach(className => classes.push(className))
    classes.push(this.disabled ? 'disabled' : '');
    classes.push(this.pristine ? 'pristine' : 'dirty');
    classes.push(this.touched ? 'touched' : 'untouched');
    classes.push(this.focused ? 'focus' : '');
    return classes;
  }

}
