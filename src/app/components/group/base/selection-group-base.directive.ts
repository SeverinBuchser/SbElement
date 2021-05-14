import { Directive, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[selectionGroupBase]'
})
export class SelectionGroupBaseDirective implements ControlValueAccessor {


  private onChangeCallback: (value: any) => void = () => {};
  private innerValue: any;
  private _disabled: boolean = false;
  private _options: Array<string> = new Array<string>();
  public selectedOptions: any = {};


  @Input()
  set disabled(isDisabled: boolean) {this._disabled = isDisabled}
  get disabled(): boolean {return this._disabled}

  @Input()
  set options(options: Array<string>) {
    this._options = options;
    this._options.forEach((option: string) => this.selectedOptions[option] = false);
  }
  get options(): Array<string> {return this._options}

  // writing value
  set value(value: any) {this.setInnerValue(value, true)}
  get value(): any {return this.innerValue}
  public writeValue(value: any): void {this.setInnerValue(value, true)}

  private setInnerValue(value: any, change: boolean): void {
    if (value !== this.innerValue && value !== null && !this.disabled) {
      this.innerValue = value;
      if (change) this.onChangeCallback(value);
    }
  }

  public registerOnChange(fn: any): void {this.onChangeCallback = fn}
  public registerOnTouched(fn: any): void {}

}
