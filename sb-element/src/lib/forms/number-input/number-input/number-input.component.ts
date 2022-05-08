import { Component, ElementRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  Color,
  hasElementRefClass,
  mixinClassName,
  mixinColor,
  mixinDisable,
  mixinFocus,
  mixinPill,
  mixinSize,
  Size } from '../../../core';

const SbNumberInputCore = mixinPill(
  mixinDisable(
    mixinFocus(
      mixinSize(
        mixinColor(
          mixinClassName(hasElementRefClass, 'sb-input'),
          Color.PRIMARY
        ),
        Size.MEDIUM
      )
    )
  )
);

@Component({
  selector: 'sb-input[type=number]',
  templateUrl: './number-input.component.html',
  inputs: [
    'isPill: pill',
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
    useExisting: SbNumberInputComponent,
    multi: true
  }]
})
export class SbNumberInputComponent extends SbNumberInputCore
  implements ControlValueAccessor {

  @Input()
  public placeholder: string = '';

  @Input()
  public min: number = Number.MIN_SAFE_INTEGER;
  @Input()
  public max: number = Number.MAX_SAFE_INTEGER;

  @Input()
  public prefixIcon: string = '';
  @Input()
  public suffixIcon: string = '';

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private innerValue: number | undefined = undefined;

  set value(value: number | undefined) {
    if (this.hasChange(value)) {
      this.writeValue(value);
      this.onChange(value);
    }
  }

  get value(): number | undefined {
    return this.innerValue;
  }

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }


  public writeValue(value: number | undefined): void {
    if (this.hasChange(value)) {
      this.innerValue = value;
    }
  }

  private hasChange(value: number | undefined): boolean {
    return value !== undefined && value !== this.innerValue && !this.disabled;
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }

}
