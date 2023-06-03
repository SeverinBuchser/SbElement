import { ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import {
  CanDisable,
  CanFocus,
  HasElementRef,
  mixinDisable,
  mixinFocus
} from '../core';

import { SbToggleCore } from './toggle-core';

export class SbToggleCVACore extends mixinFocus(mixinDisable(SbToggleCore))
  implements HasElementRef, ControlValueAccessor, CanDisable, CanFocus {

  private onChange: any = () => {};
  private onTouch: any = () => {};

  constructor(public _elementRef: ElementRef) {
    super();
  }

  public toggle(isToggled?: boolean): void {
    if (!this.disabled) {
      let previousToggled = this.toggled;
      super.toggle(isToggled);
      if (previousToggled !== this.toggled) {
        this.onChange(this.toggled);
      }
    }
  }


  public writeValue(isToggled: boolean): void {
    if (isToggled !== this.toggled && !this.disabled) {
      super.toggle(isToggled);
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }

}
