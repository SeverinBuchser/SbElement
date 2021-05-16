import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SizeThemeColorInputDirective } from '../base/style-input/size-theme-color-input.directive';

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
export class CheckboxComponent extends SizeThemeColorInputDirective implements ControlValueAccessor {

  private _disabled: boolean = false;
  @Input()
  set disabled(isDisabled: boolean) {
    this._disabled = isDisabled;
  }
  get disabled(): boolean {
    return this._disabled;
  }

  @Input()
  public label: string = '';
  @Input()
  public labelPosition: string = 'right';


  private onChangeCallback: (value: boolean) => void = () => {};
  private innerValue: boolean = false;

  constructor() {
    super();
    this.rootClass = 'sb-el-checkbox';
  }

  get value(): boolean {
    return this.innerValue;
  }

  set value(value: boolean) {
    this.setInnerValue(value, true);
  }

  public writeValue(value: boolean): void {
    this.setInnerValue(value, false);
  }

  private setInnerValue(value: boolean, change: boolean): void {
    if (value !== this.innerValue && value !== null && !this.disabled) {
      this.innerValue = value;
      if (change) this.onChangeCallback(value);
    }
  }

  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {}

  public check(): void {
    this.value = !this.value;
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.label ? 'is-label' : '');
    classes.push(this.label ? 'label-is-' + this.labelPosition : '');
    classes.push(this.disabled ? 'disabled' : '');
    classes.push(this.value ? 'is-checked' : 'is-unchecked');
    return classes;
  }

}
