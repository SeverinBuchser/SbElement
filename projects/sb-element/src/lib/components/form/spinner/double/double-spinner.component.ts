import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorSizeThemeColorInputDirective } from '../../../../core/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive';


@Component({
  selector: 'sb-el-double-spinner',
  templateUrl: './double-spinner.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DoubleSpinnerComponent,
    multi: true
  }]
})
export class DoubleSpinnerComponent extends ControlValueAccessorSizeThemeColorInputDirective<Array<number>> {
  public rootClass = 'sb-el-input';

  @Input()
  public firstPlaceholder: string = '';

  @Input()
  public secondPlaceholder: string = '';

  @Input()
  public firstMin: number = Number.MIN_SAFE_INTEGER;
  @Input()
  public secondMin: number = Number.MIN_SAFE_INTEGER;
  @Input()
  public firstMax: number = Number.MAX_SAFE_INTEGER;
  @Input()
  public secondMax: number = Number.MAX_SAFE_INTEGER;

  @Input()
  public delimiter: string = ':';

  @Input()
  public type: string = 'text';

  @Input()
  public spellcheck: boolean = false;

  @Input()
  public prefixIcon: string = '';
  @Input()
  public suffixIcon: string = '';

  @Input()
  public connectOverflow: boolean = false;

  public firstValue: number | undefined = undefined;
  public secondValue: number | undefined = undefined;

  public handleInput(): void {
    if (this.firstValue && this.secondValue) {
      this.writeValueInnerChange([this.firstValue, this.secondValue])
    }
  }

  public updateValues(): void {
    if (this.value) {
      if (this.value.length > 0) this.firstValue = this.value[0];
      if (this.value.length > 1) this.secondValue = this.value[1];
    }
  }

}
