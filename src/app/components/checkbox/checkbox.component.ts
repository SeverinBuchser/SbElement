import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseThemeSizeInputDirective } from '../base/base-theme-size-input/base-theme-size-input.directive';

@Component({
  selector: 'sb-el-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CheckboxComponent,
    multi: true
  }]
})
export class CheckboxComponent extends BaseThemeSizeInputDirective implements ControlValueAccessor {

  private _disabled: boolean = false;
  @Input()
  set disabled(isDisabled: boolean) {
    this._disabled = isDisabled;
  }
  get disabled(): boolean {
    return this._disabled;
  }

  @Input()
  public label: string = '';
  @Input()
  public labelPosition: string = 'right';


  private onChangeCallback: (value: boolean) => void = () => {};
  private innerValue: boolean = false;

  get value(): boolean {
    return this.innerValue;
  }

  set value(value: boolean) {
    this.setInnerValue(value, true);
  }

  public writeValue(value: boolean): void {
    this.setInnerValue(value, false);
  }

  private setInnerValue(value: boolean, change: boolean): void {
    if (value !== this.innerValue && value !== null && !this.disabled) {
      this.innerValue = value;
      if (change) this.onChangeCallback(value);
    }
  }

  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {}

  public check(): void {
    this.value = !this.value;
  }

  get checkboxClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push('sb-checkbox');
    classes.push('checkbox--' + this.theme + '-' + this.color);
    classes.push('checkbox--' + this.size);
    classes.push(this.value ? 'is-checked' : 'is-unchecked');
    classes.push(this.label ? 'is-label' : '');
    classes.push(this.label ? 'label-is-' + this.labelPosition : '');
    classes.push(this.disabled ? 'disabled' : '');
    return classes;
  }

}
