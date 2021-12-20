import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as fns from "date-fns";
import { ThemeService } from "../../../../services/theme/theme.service";
import { SizeThemeColorInputDirective } from "../../../base/style-input";

@Component({
  selector: 'sb-el-calendar-month',
  templateUrl: './calendar-month.component.html'
})
export class CalendarMonthComponent extends SizeThemeColorInputDirective {

  public rootClass: string = 'sb-el-calendar-month';

  @Output()
  public select: EventEmitter<Date> = new EventEmitter<Date>();
  public handleSelect(date: Date): void {
    if (fns.isSameMonth(this._showingMonthStart, date)) {
      this.select.emit(date);
    }
  }

  @Input()
  public markedDates: Array<Date> = new Array<Date>();

  @Input()
  set showingMonthStart(date: Date) {
    this._showingMonthStart = fns.startOfMonth(date);
    this.updateCalendarMonth()
  }
  private _showingMonthStart: Date = fns.startOfMonth(new Date());
  public calendarMonth!: Array<Array<Date>>;
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
    this.calendarMonth = this.generateCalendarMonth(this._showingMonthStart);
  }

  private generateCalendarMonth(showingMonthStart: Date): Array<Array<Date>> {
    let calendarMonth = new Array<Array<Date>>();
    let calendarMonthStart = showingMonthStart;
    if (fns.isMonday(showingMonthStart)) {
      calendarMonthStart = fns.subWeeks(showingMonthStart, 1);
    }
    calendarMonthStart = fns.startOfWeek(calendarMonthStart, { weekStartsOn : 1 });

    for (let week = 0 ; week < 6 ; week++) {
      let calendarWeek = new Array<Date>();
      for (let day = 0 ; day < 7 ; day++) {
        calendarWeek.push(fns.addDays(calendarMonthStart, week * 7 + day));
      }
      calendarMonth.push(calendarWeek);
    }
    return calendarMonth;
  }

  public format(date: Date): string {
    return fns.format(date, 'dd');
  }

  public getClaendarDateClasses(date: Date): Array<string> {
    let classes = new Array<string>();
    classes.push(this.rootClass + '__date');

    if (this.markedDates.length == 2) {
      let start = this.markedDates[0];
      let end = this.markedDates[1];
      if (fns.isAfter(date, start) && fns.isBefore(date, end)) {
        classes.push('between');
        classes.push('marked');
      } else if (fns.isEqual(date, start)) {
        classes.push('start');
        classes.push('marked');
      } else if (fns.isEqual(date, end)) {
        classes.push('end');
        classes.push('marked');
      }
    } else if (this.markedDates.length == 1) {
      if (fns.isEqual(date, this.markedDates[0])) {
        classes.push('marked');
      }
    }

    if (!fns.isSameMonth(this._showingMonthStart, date)) {
      classes.push('not-in-month')
    }
    return classes;
  }
}
