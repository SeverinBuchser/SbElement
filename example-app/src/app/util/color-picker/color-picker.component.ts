import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Color, mixinClassName } from 'sb-element';

const ColorPickerCore = mixinClassName(
  class {
    constructor(public _elementRef: ElementRef) {}
  }, 'color-picker'
)

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ColorPickerComponent,
    multi: true
  }]
})
export class ColorPickerComponent extends ColorPickerCore implements ControlValueAccessor {

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private _notAllowed: Array<Color> = new Array();
  @Input()
  set notAllowed(colors: Array<Color>) {
    this._notAllowed = colors;
    if (this._notAllowed.includes(this.currentColor)) {
      this.colors.every((color: Color) => {
        let colorAllowed = !this._notAllowed.includes(color);
        if (colorAllowed) {
          this.pick(color);
        }
        return !colorAllowed;
      })
    }
  }
  get notAllowed(): Array<Color> {
    return this._notAllowed;
  }

  public colors: Array<Color> = [Color.PRIMARY, Color.SECONDARY, Color.SUCCESS, Color.WARN, Color.INFO];

  private _currentColor: Color = Color.PRIMARY;
  get currentColor(): Color {
    return this._currentColor;
  }
  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public pick(color: Color): void {
    if (color && this.currentColor != color && !this.notAllowed.includes(color)) {
      this._currentColor = color;
      this.onChange(color);
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }

  public writeValue(color: Color): void {
    if (color && this.currentColor != color && !this.notAllowed.includes(color)) {
      this._currentColor = color;
    }
  }

}
