import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Color, mixinDisable, mixinFocus, Size } from "../../core";
import { SbDoubleInput } from "../input";

const SbTimeInputCore = mixinDisable(mixinFocus(class {}));

@Component({
  selector: 'sb-input[type=time]',
  templateUrl: './time-input.component.html',
  inputs: [
    'disabled'
  ],
  outputs: [
    'blur',
    'focus'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbTimeInputComponent,
    multi: true
  }]
})
export class SbTimeInputComponent extends SbTimeInputCore
  implements ControlValueAccessor {

  @Input()
  public color: string = Color.PRIMARY;

  @Input()
  public size: string = Size.MEDIUM;

  @Input('pill')
  public isPill: boolean | string = false;

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private innerValue: SbDoubleInput<number> = new SbDoubleInput();

  set value(value: SbDoubleInput<number>) {
    this.writeValue(value);
    this.onChange(value);
  }

  get value(): SbDoubleInput<number> {
    return this.innerValue;
  }


  public writeValue(value: SbDoubleInput<number>): void {
    if (value !== this.innerValue && !this.disabled) {
      this.innerValue = value;
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }
}
