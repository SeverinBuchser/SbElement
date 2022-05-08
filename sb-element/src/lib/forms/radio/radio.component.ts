import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  Color,
  hasElementRefClass,
  mixinClassName,
  mixinColor,
  mixinDisable,
  mixinFocus } from '../../core';

const SbRadioCore = mixinDisable(
  mixinFocus(
    mixinColor(
      mixinClassName(hasElementRefClass, 'sb-radio'),
      Color.PRIMARY
    )
  )
);

@Component({
  selector: 'sb-radio',
  templateUrl: './radio.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.disabled]': 'disabled'
  },
  inputs: [
    'size',
    'color',
    'disabled'
  ],
  outputs: [
    'blur',
    'focus'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbRadioComponent,
    multi: true
  }]
})
export class SbRadioComponent extends SbRadioCore implements ControlValueAccessor {

  @Input()
  public name: string = '';

  @Input()
  public label: string = '';

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
