import { ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CanDisable, CanFocus, HasElementRef, mixinDisable, mixinFocus } from '../../../core';

export class SbToggleCore extends mixinFocus(
  mixinDisable(
    class {
      constructor() { }
    }
  )
) implements HasElementRef, ControlValueAccessor, CanDisable, CanFocus {

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private _toggled: boolean = false;
  get toggled(): boolean {
    return this._toggled;
  }

  constructor(public _elementRef: ElementRef) {
    super();
  }

  public toggle(): void {
    if (!this.disabled) {
      this._toggled = !this.toggled;
      this.onChange(this.toggled);
    }
  }


  public writeValue(value: boolean): void {
    if (value !== this.toggled && !this.disabled) {
      this._toggled = value;
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }

}
