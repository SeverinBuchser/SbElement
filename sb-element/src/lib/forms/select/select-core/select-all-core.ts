import { ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { SbSelectCore, SbSelectToggle } from './select-core';
import { CanDisable, CanFocus, HasElementRef, mixinDisable, mixinFocus } from '../../../core';


const SbSelectAllCoreCore = mixinFocus(mixinDisable(SbSelectCore))

export class SbSelectAllCore<Selectable> extends SbSelectAllCoreCore<Selectable>
	implements HasElementRef, ControlValueAccessor, CanDisable, CanFocus {

  private onChange: any = () => {};
  private onTouch: any = () => {};

  constructor(public _elementRef: ElementRef) {
    super();
  }

	public select(option: Selectable): void {
		if (!this.disabled) {
			let toggle = this.get(option);
			if (toggle) {
				toggle.toggle();
				this.updateToggles();
				this.onChange(this.toggles);
			}
    }
	}

  public writeValue(toggles: Array<SbSelectToggle<Selectable>>): void {
		if (toggles && !this.disabled) {
			this.options = toggles.map((selectToggle => selectToggle.name));
			toggles.forEach((selectToggle: SbSelectToggle<Selectable>) => {
				let toggle = this.get(selectToggle.name);
				if (toggle) {
					toggle.toggle(selectToggle.toggled);
				}
			})
			this.updateToggles();
		}
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }

}
