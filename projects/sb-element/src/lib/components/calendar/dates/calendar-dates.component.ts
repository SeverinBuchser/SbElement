import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import * as fns from "date-fns";
import { SbThemeService, mixinFocus, mixinColor, mixinClassName, mixinTheme, Color, mixinDisable } from "../../../core";
import { MarkedDates } from "../marked-dates";

const SbCalendarDatesCore = mixinDisable(
  mixinFocus(
    mixinColor(
      mixinTheme(
        mixinClassName(
          class {
            constructor(
              public _elementRef: ElementRef,
              public _themeService: SbThemeService) {}
          }, 'sb-calendar-dates'
        )
      ), Color.PRIMARY
    )
  )
);

@Component({
  selector: 'sb-calendar-dates',
  templateUrl: './calendar-dates.component.html',
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
export class SbCalendarDatesComponent extends SbCalendarDatesCore {

  @Input()
  public weekDayFormat: string = 'EEEEEE';

  @Output()
  public select: EventEmitter<Date> = new EventEmitter<Date>();
  public handleSelect(date: Date): void {
    if (fns.isSameMonth(this.showingMonthStart, date)) {
      this.select.emit(date);
    }
  }

  @Input()
  public markedDates: MarkedDates = new MarkedDates();

  @Input()
  set showingMonthStart(date: Date) {
    this._showingMonthStart = fns.startOfMonth(date);
    this.updateCalendarDates()
  }
  get showingMonthStart(): Date {
    return this._showingMonthStart;
  }
  private _showingMonthStart: Date = fns.startOfMonth(new Date());
  public calendarDates!: Array<Date>;
  public weekDays: Array<string> = new Array<string>();

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService
  ) {
    super(elementRef, themeService);
    this.updateCalendarDates();
    this.createWeekDays();
  }

  private createWeekDays(): void {
    let date = fns.setDay(new Date(), 1);
    for (let weekDay = 1 ; weekDay <= 7 ; weekDay++) {
      this.weekDays.push(fns.format(date, this.weekDayFormat))
      date = fns.addDays(date, 1);
    }
  }

  private updateCalendarDates(): void {
    this.calendarDates = new Array<Date>();
    let calendarMonthStart = this.showingMonthStart;
    if (fns.isMonday(this.showingMonthStart)) {
      calendarMonthStart = fns.subWeeks(this.showingMonthStart, 1);
    }
    calendarMonthStart = fns.startOfWeek(calendarMonthStart, {weekStartsOn : 1});

    for (let day = 0 ; day < 42 ; day++) {
      this.calendarDates.push(fns.addDays(calendarMonthStart, day));
    }
  }
}
