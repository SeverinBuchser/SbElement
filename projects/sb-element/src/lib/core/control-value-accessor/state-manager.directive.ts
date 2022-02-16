import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[selector]'
})
export class StateManagerDirective {

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

  public setFocusedState(focused: boolean): void {
    this.focused = focused
  }
}
