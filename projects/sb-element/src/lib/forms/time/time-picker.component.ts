import { Component, Input } from '@angular/core';
import { Color, mixinDisable, mixinFocus, Size } from "../../core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SbDoubleInput } from "../input";

const SbTimePickerCore = mixinDisable(mixinFocus(class {}));

@Component({
  selector: 'sb-input[type=time]',
  templateUrl: './time-picker.component.html',
  inputs: [
    'disabled'
  ],
  outputs: [
    'focus',
    'blur'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbTimePickerComponent,
    multi: true
  }]
})
export class SbTimePickerComponent extends SbTimePickerCore implements ControlValueAccessor {

  @Input()
  public color: string = Color.PRIMARY;

  @Input()
  public size: string = Size.MEDIUM;


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
