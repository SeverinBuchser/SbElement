import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseThemeSizeInputDirective } from '../base/base-theme-size-input/base-theme-size-input.directive';

@Component({
  selector: 'sb-el-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ToggleSwitchComponent,
    multi: true
  }]
})
export class ToggleSwitchComponent extends BaseThemeSizeInputDirective implements ControlValueAccessor {

  private _disabled: boolean = false;
  @Input()
  set disabled(isDisabled: boolean) {this._disabled = isDisabled}
  get disabled(): boolean {return this._disabled}

  @Input()
  public on: any = true;

  private _off: any = false;
  @Input()
  set off(off: any) {
    this._off = off;
    this.setInnerValue(off, false);
  }
  get off(): any {return this._off}

  private onChangeCallback: (value: any) => void = () => {};

  private innerValue: any;
  public state: boolean = false;

  // writing value
  get value(): any {return this.innerValue}
  set value(value: any) {this.setInnerValue(value, true)}
  public writeValue(value: any): void {this.setInnerValue(value, false)}

  private setInnerValue(value: any, change: boolean): void {
    if (value !== this.innerValue && value !== null && !this.disabled) {
      this.checkValueIsOption(value);
      this.innerValue = value;
      this.updateState();
      if (change) this.onChangeCallback(value);
    }
  }

  private updateState(): void {
    if (this.on === this.value) this.state = true;
    else if (this.off === this.value) this.state = false;
    else if (!this.value) this.state = false;
  }

  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {}

  public toggle(): void {
    this.value = this.value === this.on ? this.off : this.on;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private checkValueIsOption(value: any): void {
    if (value !== this.on && value !== this.off) throw new Error("Option " + value + " not available!");
  }

  get toggleSwitchClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push('sb-toggle-switch');
    classes.push('toggle-switch--' + this.theme + '-' + this.color);
    classes.push('toggle-switch--' + this.size);
    classes.push(this.state ? 'is-on' : 'is-off');
    classes.push(this.disabled ? 'disabled' : '');
    return classes;
  }

}
