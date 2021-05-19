import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[selector]'
})
export class ControlValueAccessorBaseDirective<ValueType> implements ControlValueAccessor {

  private onChangeCallback: (value: ValueType | undefined) => void = () => {};
  private innerValue: ValueType | undefined;
  protected innerChange: boolean = false;

  @Output()
  public change: EventEmitter<ValueType> = new EventEmitter<ValueType>();

  @Output()
  public blur: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public focus: EventEmitter<void> = new EventEmitter<void>();


  private _touched: boolean = false;
  set touched(isTouched: boolean) { this.touched = isTouched }
  get touched(): boolean {return this._touched}

  private _pristine: boolean = true;
  set pristine(isPristine: boolean) { this.pristine = isPristine }
  get pristine(): boolean {return this._pristine}

  private _disabled: boolean = false;
  @Input()
  set disabled(isDisabled: boolean) { this._disabled = isDisabled }
  get disabled(): boolean { return this._disabled }

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
      if (change) {
        this.setPristineState(false);
        this.onChangeCallback(value);
        this.emitChange();
      }
    }
  }

  protected updateValues(): void {};

  // register events
  public registerOnChange(fn: any): void {this.onChangeCallback = fn}
  public registerOnTouched(fn: any): void {}

  // set disabled state
  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  public setTouchedState(touched: boolean): void {
    this._touched = touched;
  }

  public setPristineState(pristine: boolean): void {
    this._pristine = pristine;
  }

  // events
  private emitBlur(): void {
    this.blur.emit();
  }

  private emitFocus(): void {
    this.focus.emit();
  }

  private emitChange(): void {
    this.change.emit(this.value);
  }

}
