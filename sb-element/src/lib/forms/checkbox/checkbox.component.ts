import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Color, mixinClassName, mixinColor, mixinDisable, mixinFocus } from '../../core';

const SbCheckboxCore = mixinFocus(
  mixinDisable(
    mixinColor(
      mixinClassName(
        class {
          constructor(public _elementRef: ElementRef) {}
        }, 'sb-checkbox'
      ), Color.PRIMARY
    )
  )
);

@Component({
  selector: 'sb-checkbox',
  templateUrl: './checkbox.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.disabled]': 'disabled'
  },
  inputs: [
    'color',
    'disabled'
  ],
  outputs: [
    'focus',
    'blur'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbCheckboxComponent,
    multi: true
  }]
})
export class SbCheckboxComponent extends SbCheckboxCore implements ControlValueAccessor {

  @Input()
  public name: string = '';

  @Input()
  public label: string = '';

  private checked: boolean = false;

  set value(value: boolean) {
    if (value !== this.checked && !this.disabled) {
      this.checked = value;
      this.onChange(value);
    }
  }
  get value(): boolean {
    return this.checked;
  }

  private onChange: any = () => {};
  private onTouch: any = () => {};

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

  public writeValue(value: boolean): void {
    if (value !== this.checked && !this.disabled) {
      this.checked = value;
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }

}
