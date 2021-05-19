import { Directive } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { EventManagerDirective } from './event-manager.directive';

@Directive({
  selector: '[selector]'
})
export class ControlValueAccessorBaseDirective<ValueType> extends EventManagerDirective<ValueType> implements ControlValueAccessor {

  private innerValue: ValueType | undefined;
  protected innerChange: boolean = false;

  // writing value
  set value(value: ValueType | undefined) { this.setInnerValue(value, true) }
  get value(): ValueType | undefined { return this.innerValue }
  public writeValue(value: ValueType | undefined): void { this.setInnerValue(value, false) }
  public writeValueInnerChange(value: ValueType | undefined) {
    this.innerChange = true;
    this.setInnerValue(value, true);
    this.innerChange = false;
  }

  private setInnerValue(value: ValueType | undefined, change: boolean): void {
    if (value !== this.innerValue && value !== null && !this.disabled) {
      this.innerValue = value;
      this.updateValues();
      if (change) this.emitChange(value);
    }
  }

  protected updateValues(): void {};

  // register events
  public registerOnChange(fn: any): void { this.onChangeCallback = fn }
  public registerOnTouched(fn: any): void { this.onTouchedCallBack = fn }

}
