import { Directive } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { EventManagerDirective } from './event-manager.directive';

@Directive({
  selector: '[selector]'
})
export class ControlValueAccessorBaseDirective<ValueType> extends EventManagerDirective<ValueType> implements ControlValueAccessor {

  private innerValue: ValueType | undefined;
  protected allowEmpty: boolean = false;

  // writing value
  set value(value: ValueType | undefined) { this.setInnerValue(value, true, false) }
  get value(): ValueType | undefined { return this.innerValue }
  public writeValue(value: ValueType | undefined): void { this.setInnerValue(value, false, false) }
  public writeValueInnerChange(value: ValueType | undefined) {
    this.setInnerValue(value, true, true);
  }

  private setInnerValue(value: ValueType | undefined, emitChange: boolean, innerChange: boolean): void {
    if (value !== this.innerValue && !this.disabled) {
      if (!this.allowEmpty && value !== null) {
        this.innerValue = value;
        if (!innerChange) this.updateValues();
        if (emitChange) this.emitChange(value);
      } else if (this.allowEmpty) {
        value = value == null ? undefined : value;
        this.innerValue = value;
        if (!innerChange) this.updateValues();
        if (emitChange) this.emitChange(value);
      }
    }
  }

  protected updateValues(): void {};

}
