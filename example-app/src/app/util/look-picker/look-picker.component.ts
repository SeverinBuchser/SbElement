import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { mixinClassName } from 'sb-element';

const LookPickerCore = mixinClassName(
  class {
    constructor(public _elementRef: ElementRef) {}
  }, 'look-picker'
)

export type Look = 'default' | 'plain' | 'accent' | 'accent-plain';

@Component({
  selector: 'look-picker',
  templateUrl: './look-picker.component.html',
  styleUrls: ['./look-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: LookPickerComponent,
    multi: true
  }]
})
export class LookPickerComponent extends LookPickerCore implements ControlValueAccessor {

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private _notAllowed: Array<Look> = new Array();
  @Input()
  set notAllowed(looks: Array<Look>) {
    this._notAllowed = looks;
    if (this._notAllowed.includes(this.currentLook)) {
      this.looks.every((look: Look) => {
        let lookAllowed = !this._notAllowed.includes(look);
        if (lookAllowed) {
          this.pick(look);
        }
        return !lookAllowed;
      })
    }
  }
  get notAllowed(): Array<Look> {
    return this._notAllowed;
  }

  public looks: Array<Look> = ['default', 'plain', 'accent', 'accent-plain'];

  private _currentLook: Look = 'default';
  get currentLook(): Look {
    return this._currentLook;
  }
  set currentLook(shape: Look) {
    this._currentLook = shape;
  }

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public pick(look: Look): void {
    if (look && this.currentLook != look && !this.notAllowed.includes(look)) {
      this.currentLook = look;
      this.onChange(look);
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }

  public writeValue(look: Look): void {
    if (look && this.currentLook != look && !this.notAllowed.includes(look)) {
      this._currentLook = look;
    }
  }

}
