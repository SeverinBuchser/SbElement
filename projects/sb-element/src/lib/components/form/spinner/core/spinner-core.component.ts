import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorSizeThemeColorInputDirective } from '../../../../core/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive';

@Component({
  selector: 'sb-input-core[type=number]',
  templateUrl: './spinner-core.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SpinnerCoreComponent,
    multi: true
  }]
})
export class SpinnerCoreComponent extends ControlValueAccessorSizeThemeColorInputDirective<number> {

  public rootClass = 'sb-input-core';
  protected allowEmpty = true;

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

  private intervals: Array<number> = new Array<number>();
  private isMouseDown: boolean = false;
  private static SPEED_FACTOR: number = 2;
  private static MAX_SPEED: number = 10;
  private static MAX_STEP: number =  Math.pow(SpinnerCoreComponent.SPEED_FACTOR, 7);
  private steps: number = 0;
  private speed: number = 0;
  private delta: number = 1;

  public handleMouseDownIncrease(): void {
    this.handleMouseDown(this.increase)
  }

  public handleMouseDownDecrease(): void {
    this.handleMouseDown(this.decrease)
  }

  private handleMouseDown(stepFunction: () => void): void {
    this.isMouseDown = true;
    stepFunction();
    this.wait(400).then(() => {
      if (this.isMouseDown) {
        this.intervals.push(setInterval(() => {
          stepFunction();
          this.updateSpeed();
        }, 30));
      }
    })
  }

  private updateSpeed(): void {
    if (this.speed < SpinnerCoreComponent.MAX_SPEED &&
      this.steps == SpinnerCoreComponent.MAX_STEP) {
      this.speed += 1;
      this.delta = Math.pow(SpinnerCoreComponent.SPEED_FACTOR, this.speed)
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
    this.writeValueInnerChange(newValue);
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
    this.writeValueInnerChange(newValue);
  }

  public handleMouseUp(): void {
    this.isMouseDown = false;
    this.intervals.forEach((interval: number) => clearInterval(interval));
    this.steps = 0;
    this.speed = 0;
    this.delta = 1;
  }

  private async wait(time: number): Promise<void> {
    return new Promise<void>(resolve => {
      let timeout = setTimeout(() => {
        resolve();
        clearTimeout(timeout);
      }, time);
    });
  }

  public getInputClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push(this.rootClass + '__input');
    classes.push(this.rootClass + '__spinner');
    return classes;
  }

  public getPlaceholderClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push(this.rootClass + '__placeholder');
    classes.push(this.value != null || this.focused ? 'top' : '');
    return classes;
  }

}
