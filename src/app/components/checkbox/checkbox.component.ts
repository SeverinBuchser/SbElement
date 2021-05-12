import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseThemeSizeInputDirective } from '../base/base-theme-size-input/base-theme-size-input.directive';

@Component({
  selector: 'sb-el-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CheckboxComponent,
    multi: true
  }]
})
export class CheckboxComponent extends BaseThemeSizeInputDirective implements ControlValueAccessor {

  private onChangeCallback: (value: boolean) => void = () => {};
  private innerValue: boolean = false;

  get value(): boolean {
    return this.innerValue;
  }

  set value(value: boolean) {
    if (value !== this.innerValue && value !== null) {
      this.innerValue = value;
      this.onChangeCallback(value);
    }
  }

  public writeValue(value: boolean): void {
    if (value !== this.innerValue && value !== null) {
      this.innerValue = value;
    }
  }

  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {}

  public changeChecked(): void {
    this.value = !this.value;
  }

  get checkboxClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push('sb-checkbox');
    classes.push('checkbox--' + this.theme + '-' + this.color);
    classes.push('checkbox--' + this.size);
    classes.push(this.value ? 'checked' : 'unchecked');
    return classes;
  }

}
