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

  @Input()
  public size: 's' | 'd' | 'm' | 'l' | null = 's';

  @Input()
  public color: 'warn' | 'success' | 'info' | 'primary' | 'secondary' | null = 'primary';

  @Input()
  public theme: 'light' | 'night' = 'light';

}
