import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorSizeThemeColorInputDirective } from '../../../../core/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive';

@Component({
  selector: 'sb-el-spinner',
  templateUrl: './spinner.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SpinnerComponent,
    multi: true
  }]
})
export class SpinnerComponent extends ControlValueAccessorSizeThemeColorInputDirective<number> {

  public rootClass = 'sb-el-input';
  protected allowEmpty = true;

  @Input()
  public placeholder: string = '';

  @Input()
  public min: number = Number.MIN_SAFE_INTEGER;
  @Input()
  public max: number = Number.MAX_SAFE_INTEGER;

  @Input()
  public prefixIcon: string = '';
  @Input()
  public suffixIcon: string = '';

}
