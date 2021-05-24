import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[selector]'
})
export class StateManagerDirective {

  private _touched: boolean = false;
  @Input()
  set touched(isTouched: boolean) { this._touched = isTouched }
  get touched(): boolean {return this._touched}

  private _pristine: boolean = true;
  @Input()
  set pristine(isPristine: boolean) { this._pristine = isPristine }
  get pristine(): boolean {return this._pristine}

  private _disabled: boolean = false;
  @Input()
  set disabled(isDisabled: boolean) { this._disabled = isDisabled }
  get disabled(): boolean { return this._disabled }

  private _focused: boolean = false;
  @Input()
  set focused(isFocused: boolean) { this._focused = isFocused }
  get focused(): boolean { return this._focused }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  public setTouchedState(touched: boolean): void {
    this.touched = touched;
  }

  public setPristineState(pristine: boolean): void {
    this.pristine = pristine;
  }

  public setFocusedState(focused: boolean): void {
    this.focused = focused
  }
}
