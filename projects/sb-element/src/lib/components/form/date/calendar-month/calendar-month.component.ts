import { Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import * as fns from "date-fns";
import { ThemeService, SizeThemeColorInputDirective } from "../../../../core";
import { MarkedDates } from "../marked-dates";

@Component({
  selector: 'sb-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarMonthComponent extends SizeThemeColorInputDirective {

  public rootClass: string = 'sb-calendar-month';

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
  private _showingMonthStart: Date = fns.startOfMonth(new Date());
  public calendarMonth!: Array<Date>;
  public weekDays: Array<string> = new Array<string>();

  constructor(themeService: ThemeService) {
    super(themeService);
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

  public format(date: Date): string {
    return fns.format(date, 'dd');
  }

  public getClaendarDateClasses(date: Date): Array<string> {
    let classes = new Array<string>();
    classes.push(this.rootClass + '__date');
    if (!this.markedDates.startEqualsEnd) {
      if (this.markedDates.isBetween(date)) {
        classes.push('between');
        classes.push('marked');
      } else if (this.markedDates.isStart(date)) {
        classes.push('start');
        classes.push('marked');
      } else if (this.markedDates.isEnd(date)) {
        classes.push('end');
        classes.push('marked');
      }
    } else if (this.markedDates.startEqualsEnd) {
      if (this.markedDates.isStartSameDay(date) && this.markedDates.isEndSameDay(date)) {
        classes.push('marked');
      }
    }

    if (!fns.isSameMonth(this._showingMonthStart, date)) {
      classes.push('not-in-month')
    }
    return classes;
  }

  @HostBinding('class')
  get classes(): Array<string> {
    let classes = super.getClasses();
    return classes;
  }
}
