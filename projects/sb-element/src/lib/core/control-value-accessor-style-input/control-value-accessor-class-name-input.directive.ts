import { Directive, Input } from '@angular/core';
import { ControlValueAccessorBaseDirective } from '../control-value-accessor/control-value-accessor.base.directive';

@Directive({
  selector: '[selector]',
  host: {
    '[class.disabled]': 'disabled',
    '[class.pristine]': 'pristine',
    '[class.dirty]': '!pristine',
    '[class.touched]': 'touched',
    '[class.untouched]': '!touched',
    '[class.focus]': 'focused'
  }
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
    if (this.rootClass) {
      classes.push(this.rootClass);
    }
    this._extraClasses.forEach(className => classes.push(className))
    return classes;
  }

}
