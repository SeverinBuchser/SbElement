import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
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

const SbInputCore = mixinPill(
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
  selector: 'sb-input[type=text], sb-input[type=password], sb-input[type=email]',
  templateUrl: './input.component.html',
  encapsulation: ViewEncapsulation.None,
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
    useExisting: SbInputComponent,
    multi: true
  }]
})
export class SbInputComponent extends SbInputCore implements ControlValueAccessor {

  @Input()
  public placeholder: string = '';

  @Input()
  public type: string = 'text';

  @Input()
  public spellcheck: boolean = false;

  @Input()
  public prefixIcon: string = '';
  @Input()
  public suffixIcon: string = '';

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private innerValue: string | undefined = undefined;

  set value(value: string) {
    if (this.hasChange(value)) {
      this.writeValue(value);
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
    if (this.hasChange(value)) {
      this.innerValue = value;
    }
  }

  private hasChange(value: string): boolean {
    return value !== undefined && value !== this.innerValue && !this.disabled;
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }

}
