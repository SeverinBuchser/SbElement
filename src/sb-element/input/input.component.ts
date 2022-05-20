import { Component, ElementRef, Input, Optional, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  Color,
  hasElementRefClass,
  mixinClassName,
  mixinColor,
  mixinDisable,
  mixinFocus, mixinPill, mixinSize, Size
} from '../core';

import { SbInputGroupComponent } from './input-group.component';

const SbInputCore = mixinPill(
  mixinDisable(
    mixinFocus(
      mixinSize(
        mixinColor(
          mixinClassName(hasElementRefClass, 'sb-input'),
          Color.PRIMARY
        ),
        Size.MEDIUM
      )
    )
  )
);

@Component({
  selector: 'sb-input[type=text], sb-input[type=number], sb-input[type=email]' + 
    'sb-input[type=password], sb-input[type=url]',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'isPill: pill',
    'size',
    'color',
    'disabled'
  ],
  outputs: [
    'blur',
    'focus'
  ],
  host: {
    '[class.border]': 'hasBorder'
  },
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbInputComponent,
    multi: true
  }]
})
export class SbInputComponent extends SbInputCore
  implements ControlValueAccessor {

  @Input()
  public placeholder: string = '';

  @Input()
  public type: string = 'text';

  @Input()
  public spellcheck: boolean = false;

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private innerValue: any | undefined = undefined;
  public hasBorder: boolean = true;

  set value(value: any) {
    this.writeValue(value);
    this.onChange(value);
  }

  get value(): any {
    if (this.innerValue) {
      return this.innerValue;
    } else return '';
  }

  public getPlaceholderClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push(this.className + '__placeholder')
    classes.push(this.value || this.focused ? 'top' : '')
    return classes;
  }

  private _min: number = Number.MIN_SAFE_INTEGER;
  private _max: number = Number.MAX_SAFE_INTEGER;
  private timeout?: any;
  private interval?: any;
  private static SPEED_FACTOR: number = 2;
  private static MAX_SPEED: number = 10;
  private static MAX_STEP: number =  Math.pow(SbInputComponent.SPEED_FACTOR, 7);
  private steps: number = 0;
  private speed: number = 0;
  private delta: number = 1;

  constructor(
    elementRef: ElementRef, 
    @Optional() private _inputGroup?: SbInputGroupComponent
  ) {
    super(elementRef);
    if (this._inputGroup) {
      this.hasBorder = false;
      this.color = this._inputGroup.color;
      this.size = this._inputGroup.size;
    }
  }

  public writeValue(value: string): void {
    if (value == '' || value !== this.innerValue && !this.disabled) {
      this.innerValue = value;
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }


  public handleMouseDownIncrease(): void {
    this._handleMouseDown(this._increase)
  }

  public handleMouseDownDecrease(): void {
    this._handleMouseDown(this._decrease)
  }

  public handleMouseUp(): void {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    this.steps = 0;
    this.speed = 0;
    this.delta = 1;
  }

  private _handleMouseDown(stepFunction: () => void): void {
    stepFunction();
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    this.timeout = setTimeout(() => {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        stepFunction();
        this._updateSpeed();
      }, 30);
    }, 400);
  }

  private _updateSpeed(): void {
    if (this.speed < SbInputComponent.MAX_SPEED &&
      this.steps == SbInputComponent.MAX_STEP) {
      this.speed += 1;
      this.delta = Math.pow(SbInputComponent.SPEED_FACTOR, this.speed)
      this.steps = 0;
    }
  }

  private _increase = () => {
    let newValue: number;
    if (this.value != undefined) {
      newValue = this.value + this.delta;
    } else if (this._max >= 0) {
      newValue = 0;
    } else {
      newValue = this._max;
    }
    if (newValue > this._max) {
      newValue = this._max;
      this.steps = 0;
      this.speed = 0;
      this.delta = 1;
    }
    this.steps++;
    this.value = newValue;
  }

  private _decrease = () => {
    let newValue: number;
    if (this.value != undefined) {
      newValue = this.value - this.delta;
    } else if (this._min <= 0) {
      newValue = 0;
    } else {
      newValue = this._min;
    }
    if (newValue < this._min) {
      newValue = this._max;
      this.steps = 0;
      this.speed = 0;
      this.delta = 1;
    }
    this.steps++;
    this.value = newValue;
  }

}
