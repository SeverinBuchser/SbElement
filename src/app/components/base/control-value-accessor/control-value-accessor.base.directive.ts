import { Directive, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[selector]'
})
export class ControlValueAccessorBaseDirective<ValueType> implements ControlValueAccessor {

  private onChangeCallback: (value: ValueType | undefined) => void = () => {};
  private innerValue: ValueType | undefined;
  private _disabled: boolean = false;
  protected innerChange: boolean = false;

  @Input()
  set disabled(isDisabled: boolean) {this._disabled = isDisabled}
  get disabled(): boolean {return this._disabled}

  // writing value
  set value(value: ValueType | undefined) {this.setInnerValue(value, true)}
  get value(): ValueType | undefined {return this.innerValue}
  public writeValue(value: ValueType | undefined): void {this.setInnerValue(value, false)}
  public writeValueInnerChange(value: ValueType | undefined) {
    this.innerChange = true;
    this.setInnerValue(value, true);
    this.innerChange = false;
  }

  private setInnerValue(value: ValueType | undefined, change: boolean): void {
    if (value !== this.innerValue && value !== null && !this.disabled) {
      this.innerValue = value;
      this.updateValues();
      if (change) this.onChangeCallback(value);
    }
  }

  public registerOnChange(fn: any): void {this.onChangeCallback = fn}
  public registerOnTouched(fn: any): void {}

  protected updateValues(): void {};

}
