import { Directive, Input } from '@angular/core';
import { ControlValueAccessorSizeThemeColorInputDirective } from '../../base/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive';

@Directive({
  selector: '[selector]'
})
export class FormGroupBase<ValueType> extends ControlValueAccessorSizeThemeColorInputDirective<ValueType> {

  @Input()
  public groupTitle: string = '';
  get hasGroupTitle(): boolean {
    return this.groupTitle !== '';
  }

  public rootClass: string = 'sb-el-form-group';

  @Input()
  public groupAlign: string | null = 'left';

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.groupAlign ? 'is-' + this.groupAlign : '');
    return classes;
  }

}
