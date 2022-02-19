import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import * as fns from "date-fns";
import { Color, mixinClassName, mixinColor, mixinDisable, mixinFocus, mixinTheme, ThemeService } from "../../../core/";

const SbCalendarNavigationCore = mixinDisable(
  mixinFocus(
    mixinColor(
      mixinTheme(
        mixinClassName(
          class {
            constructor(
              public _elementRef: ElementRef,
              public _themeService: ThemeService) {}
          }, 'sb-calendar-navigation'
        )
      ), Color.PRIMARY
    )
  )
);


@Component({
  selector: 'sb-calendar-navigation',
  templateUrl: './calendar-navigation.component.html',
  styleUrls: ['./calendar-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.animate-left]': 'animate && animationDirection == "left"',
    '[class.animate-right]': 'animate && animationDirection == "right"',
    '[class.disabled]': 'disabled'
  },
  inputs: [
    'color',
    'disabled'
  ],
  outputs: [
    'focus',
    'blur'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbCalendarNavigationComponent,
    multi: true
  }]
})
export class SbCalendarNavigationComponent extends SbCalendarNavigationCore {

  public rootClass: string = 'sb-calendar-navigation';

  public previousMonth?: Date;
  public nextMonth?: Date;

  private animationDirection: string = '';
  private _animate: boolean = false;
  private _timeout: any;
  set animate(animate: boolean) {
    if (animate && !this.disabled) {
      this._timeout = setTimeout(() => this.animate = false, 200);
    } else {
      clearTimeout(this._timeout);
    }
    this._animate = animate && !this.disabled;
  }
  get animate(): boolean {
    return this._animate;
  }

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private _month: Date | undefined = undefined;
  set month(newMonth: Date | undefined) {
    if (fns.isValid(newMonth) && newMonth !== this._month && !this.disabled) {
      this._month = newMonth;
      this.onChange(newMonth);
    }
  }
  get month(): Date | undefined {
    return this._month;
  }

  get previousMonthFormatted(): string {
    if (this.previousMonth) return fns.format(this.previousMonth, 'MMM. yyyy');
    else return '';
  }

  get monthFormatted(): string {
    if (this.month) return fns.format(this.month, 'MMM. yyyy');
    else return '';
  }

  get nextMonthFormatted(): string {
    if (this.nextMonth) return fns.format(this.nextMonth, 'MMM. yyyy');
    else return '';
  }

  constructor(
    elementRef: ElementRef,
    themeService: ThemeService
  ) {
    super(elementRef, themeService);
  }

  public goToPreviousYear(): void {
    if (this.month) {
      this.nextMonth = this.month;
      this.animationDirection = 'right';
      this.animate = true;
      this.month = fns.subYears(this.month, 1);
    }
  }

  public goToNextYear(): void {
    if (this.month) {
      this.previousMonth = this.month;
      this.animationDirection = 'left';
      this.animate = true;
      this.month = fns.addYears(this.month, 1);
     }
  }

  public goToPreviousMonth(): void {
    if (this.month) {
      this.nextMonth = this.month;
      this.animationDirection = 'right';
      this.animate = true;
      this.month = fns.subMonths(this.month, 1);
     }
  }

  public goToNextMonth(): void {
    if (this.month) {
      this.previousMonth = this.month;
      this.animationDirection = 'left';
      this.animate = true;
      this.month = fns.addMonths(this.month, 1);
     }
  }

  public writeValue(newMonth: Date): void {
    if (fns.isValid(newMonth) && newMonth !== this._month) {
      this._month = newMonth;
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }

}
