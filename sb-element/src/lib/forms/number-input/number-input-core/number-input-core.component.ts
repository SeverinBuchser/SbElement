import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Color, mixinClassName, mixinColor, mixinDisable, mixinFocus, mixinSize, Size } from '../../../core';

const SbNumberInputCoreCore = mixinDisable(
  mixinFocus(
    mixinSize(
      mixinColor(
        mixinClassName(
          class {
            constructor(public _elementRef: ElementRef) {}
          }, 'sb-input-core'
        ), Color.PRIMARY
      ), Size.MEDIUM
    )
  )
);

@Component({
  selector: 'sb-input-core[type=number]',
  templateUrl: './number-input-core.component.html',
  inputs: [
    'size',
    'color',
    'disabled'
  ],
  outputs: [
    'focus',
    'blur'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbNumberInputCoreComponent,
    multi: true
  }]
})
export class SbNumberInputCoreComponent extends SbNumberInputCoreCore implements ControlValueAccessor {

  @Input()
  public placeholder: string = '';

  @Input()
  public min: number = Number.MIN_SAFE_INTEGER;
  @Input()
  public max: number = Number.MAX_SAFE_INTEGER;

  @Input()
  public prefixIcon: string = '';
  @Input()
  public suffixIcon: string = '';

  @Output()
  public overflow: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public underflow: EventEmitter<void> = new EventEmitter<void>();


  private timeout?: any;
  private interval?: any;
  private static SPEED_FACTOR: number = 2;
  private static MAX_SPEED: number = 10;
  private static MAX_STEP: number =  Math.pow(SbNumberInputCoreComponent.SPEED_FACTOR, 7);
  private steps: number = 0;
  private speed: number = 0;
  private delta: number = 1;

  private innerValue: number | undefined = undefined;

  set value(value: number | undefined) {
    this.writeValue(value);
    this.onChange(value);
  }

  get value(): number | undefined {
    return this.innerValue;
  }

  private onChange: any = () => {};
  private onTouch: () => void = () => {};

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public handleMouseDownIncrease(): void {
    this.handleMouseDown(this.increase)
  }

  public handleMouseDownDecrease(): void {
    this.handleMouseDown(this.decrease)
  }

  private handleMouseDown(stepFunction: () => void): void {
    stepFunction();
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    this.timeout = setTimeout(() => {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        stepFunction();
        this.updateSpeed();
      }, 30);
    }, 400);
  }

  private updateSpeed(): void {
    if (this.speed < SbNumberInputCoreComponent.MAX_SPEED &&
      this.steps == SbNumberInputCoreComponent.MAX_STEP) {
      this.speed += 1;
      this.delta = Math.pow(SbNumberInputCoreComponent.SPEED_FACTOR, this.speed)
      this.steps = 0;
    }
  }

  private increase = () => {
    let newValue: number;
    if (this.value != undefined) {
      newValue = this.value + this.delta;
    } else if (this.max >= 0) {
      newValue = 0;
    } else {
      newValue = this.max;
    }
    if (newValue > this.max) {
      newValue = this.min;
      this.steps = 0;
      this.speed = 0;
      this.delta = 1;
      this.overflow.emit();
    }
    this.steps++;
    this.value = newValue;
  }

  private decrease = () => {
    let newValue: number;
    if (this.value != undefined) {
      newValue = this.value - this.delta;
    } else if (this.min <= 0) {
      newValue = 0;
    } else {
      newValue = this.min;
    }
    if (newValue < this.min) {
      newValue = this.max;
      this.steps = 0;
      this.speed = 0;
      this.delta = 1;
      this.underflow.emit();
    }
    this.steps++;
    this.value = newValue;
  }

  public handleMouseUp(): void {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    this.steps = 0;
    this.speed = 0;
    this.delta = 1;
  }

  public getPlaceholderClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push(this.className + '__placeholder')
    classes.push(this.value || this.value == 0 || this.focused ? 'top' : '')
    return classes;
  }

  public writeValue(value: number | undefined): void {
    if (value !== this.innerValue && !this.disabled) {
      this.innerValue = value;
    }
  }

  public registerOnChange(fn: (value: string) => void): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }

}
