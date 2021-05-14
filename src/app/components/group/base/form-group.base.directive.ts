import { Directive, Input } from '@angular/core';
import { ControlValueAccessorBase } from './control-value-accessor.base.directive';

@Directive({
  selector: '[selector]'
})
export class FormGroupBase<ValueType> extends ControlValueAccessorBase<ValueType> {

  @Input()
  public groupTitle: string = '';
  get hasGroupTitle(): boolean {
    return this.groupTitle !== '';
  }

}
