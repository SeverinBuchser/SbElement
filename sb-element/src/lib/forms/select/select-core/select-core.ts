import { ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CanDisable, CanFocus, HasElementRef, mixinDisable, mixinFocus } from '../../../core';

export class SbSelectCore<Selectable> extends mixinFocus(
	mixinDisable(
		class {
			constructor() {}
		}
	)
) implements HasElementRef, ControlValueAccessor, CanDisable, CanFocus {

  private _options: Array<Selectable> = new Array<Selectable>();
	set options(options: Array<Selectable>) {
		this._options = options;
		this.selected = new Map();
		this._options.forEach((option: Selectable) => {
			this.selected.set(option, false);
		})
	}
	get options(): Array<Selectable> {
		return this._options;
	}

	public selected: Map<Selectable, boolean> = new Map<Selectable, boolean>();

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private innerValue: Selectable | undefined = undefined;

	get value(): Selectable | undefined {
		return this.innerValue;
	}

  constructor(public _elementRef: ElementRef) {
    super();
  }

	public isSelected(value: Selectable): boolean {
		return this.selected.get(value) ? true : false;
	}

	public select(value: Selectable): void {
		if (value !== this.innerValue && !this.disabled) {
			this.unset(this.innerValue);
      this.innerValue = value;
			this.set(this.innerValue);
      this.onChange(value);
    }
	}

	private unset(value: Selectable | undefined): void {
		if (value !== undefined) {
			this.selected.set(value, false);
		}
	}

	private set(value: Selectable | undefined): void {
		if (value !== undefined) {
			this.selected.set(value, true);
		}
	}

  public writeValue(value: Selectable | undefined): void {
    if (value !== this.innerValue && !this.disabled) {
			this.unset(this.innerValue);
      this.innerValue = value;
			this.set(this.innerValue);
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }
}
