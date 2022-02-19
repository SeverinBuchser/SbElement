import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import * as fns from "date-fns";
import { ThemeService, mixinFocus, mixinColor, mixinClassName, mixinTheme, Color, mixinDisable } from "../../../core";
import { MarkedDates } from "../marked-dates";

const SbCalendarMonthCore = mixinDisable(
  mixinFocus(
    mixinColor(
      mixinTheme(
        mixinClassName(
          class {
            constructor(
              public _elementRef: ElementRef,
              public _themeService: ThemeService) {}
          }, 'sb-calendar-month'
        )
      ), Color.PRIMARY
    )
  )
);

@Component({
  selector: 'sb-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'color',
    'disabled'
  ],
  outputs: [
    'focus',
    'blur'
  ],
})
export class SbCalendarMonthComponent extends SbCalendarMonthCore {

  @Output()
  public select: EventEmitter<Date> = new EventEmitter<Date>();
  public handleSelect(date: Date): void {
    if (fns.isSameMonth(this._showingMonthStart, date)) {
      this.select.emit(date);
    }
  }

  @Input()
  public markedDates: MarkedDates = new MarkedDates();

  @Input()
  set showingMonthStart(date: Date) {
    this._showingMonthStart = fns.startOfMonth(date);
    this.updateCalendarMonth()
  }
  get showingMonthStart(): Date {
    return this._showingMonthStart;
  }
  private _showingMonthStart: Date = fns.startOfMonth(new Date());
  public calendarMonth!: Array<Date>;
  public weekDays: Array<string> = new Array<string>();

  constructor(
    elementRef: ElementRef,
    themeService: ThemeService
  ) {
    super(elementRef, themeService);
    this.updateCalendarMonth();
    this.createWeekDays();
  }

  private createWeekDays(): void {
    let date = fns.setDay(new Date(), 1);
    for (let weekDay = 1 ; weekDay <= 7 ; weekDay++) {
      this.weekDays.push(fns.format(date, 'EEEEEE'))
      date = fns.addDays(date, 1);
    }
  }

  private updateCalendarMonth(): void {
    this.calendarMonth = new Array<Date>();
    let calendarMonthStart = this._showingMonthStart;
    if (fns.isMonday(this._showingMonthStart)) {
      calendarMonthStart = fns.subWeeks(this._showingMonthStart, 1);
    }
    calendarMonthStart = fns.startOfWeek(calendarMonthStart, {weekStartsOn : 1});

    for (let day = 0 ; day < 42 ; day++) {
      this.calendarMonth.push(fns.addDays(calendarMonthStart, day));
    }
  }
}
