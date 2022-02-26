import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Color, mixinDisable, mixinFocus } from '../../core';

const SbRadioButtonGroupCore = mixinDisable(mixinFocus(class {}));

@Component({
  selector: 'sb-radio-button-group',
  templateUrl: './radio-button-group.component.html',
  inputs: [
    'disabled'
  ],
  outputs: [
    'focus',
    'blur'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbRadioButtonGroupComponent,
    multi: true
  }]
})
export class SbRadioButtonGroupComponent extends SbRadioButtonGroupCore implements ControlValueAccessor {

  @Input()
  public color: string = Color.PRIMARY;

  @Input()
  public name: string = '';

  @Input()
  public options: Array<string> = new Array<string>();

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private innerValue: string | undefined = undefined;

  set value(value: string) {
    if (value == '' || value !== this.innerValue && !this.disabled) {
      this.innerValue = value;
      this.onChange(value);
    }
  }

  get value(): string {
    if (this.innerValue) {
      return this.innerValue;
    } else return '';
  }

  public writeValue(value: string): void {
    if (value == '' || value !== this.innerValue && !this.disabled) {
      this.innerValue = value;
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }

}
