import { ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { SbSelectCore } from './select-core';
import { CanDisable, CanFocus, HasElementRef, mixinDisable, mixinFocus } from '../../../core';

const SbSelectOneCoreCore = mixinFocus(mixinDisable(SbSelectCore))

export class SbSelectOneCore<Selectable> extends SbSelectOneCoreCore<Selectable>
	implements HasElementRef, ControlValueAccessor, CanDisable, CanFocus {

	private _selectedOption: Selectable | undefined = undefined;
	get selectedOption(): Selectable | undefined {
		return this._selectedOption;
	}

  private onChange: any = () => {};
  private onTouch: any = () => {};

  constructor(public _elementRef: ElementRef) {
    super();
  }

	public select(option: Selectable): void {
		if (option !== this._selectedOption && !this.disabled) {
			this.unset(this._selectedOption);
      this._selectedOption = option;
			this.set(this._selectedOption);
      this.onChange(option);
    }
	}

  public writeValue(option: Selectable | undefined): void {
    if (option !== this._selectedOption && !this.disabled) {
			this.unset(this._selectedOption);
      this._selectedOption = option;
			this.set(this._selectedOption);
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }

}
