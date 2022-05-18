import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { mixinClassName } from 'sb-element';

const FormPickerCore = mixinClassName(
  class {
    constructor(public _elementRef: ElementRef) {}
  }, 'form-picker'
)

export type Shape = 'default' | 'pill' | 'round'

@Component({
  selector: 'form-picker',
  templateUrl: './form-picker.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FormPickerComponent,
    multi: true
  }]
})
export class FormPickerComponent extends FormPickerCore implements ControlValueAccessor {

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private _notAllowed: Array<Shape> = new Array();
  @Input()
  set notAllowed(shapes: Array<Shape>) {
    this._notAllowed = shapes;
    if (this._notAllowed.includes(this.currentShape)) {
      this.shapes.every((shape: Shape) => {
        let shapeAllowed = !this._notAllowed.includes(shape);
        if (shapeAllowed) {
          this.pick(shape);
        }
        return !shapeAllowed;
      })
    }
  }
  get notAllowed(): Array<Shape> {
    return this._notAllowed;
  }

  public shapes: Array<Shape> = ['default', 'pill', 'round'];

  private _currentShape: Shape = 'default';
  get currentShape(): Shape {
    return this._currentShape;
  }
  set currentShape(shape: Shape) {
    this._currentShape = shape;
  }

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public pick(shape: Shape): void {
    if (shape && this.currentShape != shape && !this.notAllowed.includes(shape)) {
      this.currentShape = shape;
      this.onChange(shape);
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }

  public writeValue(shape: Shape): void {
    if (shape && this.currentShape != shape && !this.notAllowed.includes(shape)) {
      this._currentShape = shape;
    }
  }

}
