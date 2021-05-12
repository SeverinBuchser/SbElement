import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class ToggleSwitchComponent implements ControlValueAccessor {

  @Input()
  public on: any;

  private _off: any;
  @Input()
  set off(off: any) {
    this._off = off;
    this.setInnerValue(off);
  }
  get off(): any {return this._off}

  private onChangeCallback: (value: any) => void = () => {};

  private innerValue: any;
  public state: boolean = false;

  constructor() { }

  get value(): any {
    return this.innerValue;
  }

  set value(value: any) {
    if (value !== this.innerValue && value) {
      this.setInnerValue(value);
      this.onChangeCallback(value);
    }
  }

  public writeValue(value: any): void {
    if (value !== this.innerValue && value) {
      this.setInnerValue(value);
    }
  }

  private setInnerValue(value: any): void {
    this.checkValueIsOption(value);
    this.innerValue = value;
    this.updateState();
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
    this.changeState()
    this.writeValueFromState();
  }

  private writeValueFromState(): void {this.value = this.state ? this.on : this.off}

  private changeState(): void {this.state = !this.state}

  private checkValueIsOption(value: any): void {
    if (value !== this.on && value !== this.off) throw new Error("Option " + value + " not available!");
  }

}
