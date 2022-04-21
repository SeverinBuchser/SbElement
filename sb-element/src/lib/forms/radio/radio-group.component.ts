import { Component, ElementRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Color, mixinClassName, mixinDisable, mixinFocus } from '../../core';

const SbRadioGroupCore = mixinDisable(
  mixinFocus(
    mixinClassName(
      class {
        constructor(public _elementRef: ElementRef) {}
      }, 'sb-radio-group'
    )
  )
);

@Component({
  selector: 'sb-radio-group',
  templateUrl: './radio-group.component.html',
  inputs: [
    'disabled'
  ],
  outputs: [
    'focus',
    'blur'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbRadioGroupComponent,
    multi: true
  }]
})
export class SbRadioGroupComponent extends SbRadioGroupCore implements ControlValueAccessor {

  @Input()
  public color: string = Color.PRIMARY;

  @Input()
  public name: string = '';

  @Input()
  public options: Array<string> = new Array<string>();

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private innerValue: string | undefined = undefined;

  set value(value: string) {
    if (value == '' || value !== this.innerValue && !this.disabled) {
      this.innerValue = value;
      this.onChange(value);
    }
  }

  get value(): string {
    if (this.innerValue) {
      return this.innerValue;
    } else return '';
  }

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public writeValue(value: string): void {
    if (value == '' || value !== this.innerValue && !this.disabled) {
      this.innerValue = value;
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }

}
