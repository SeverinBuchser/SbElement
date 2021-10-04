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
  public handleSelect(date: Date): void {this.select.emit(date);}

  @Input()
  public selectedDate?: Date;

  @Input()
  set showingMonthStart(date: Date) {
    // if (fns.compareAsc(date, this._showingMonthStart) < 0) {
    //   this.compareDate = this._showingMonthStart;
    // } else {
    //   this.compareDate = fns.startOfMonth(date);
    // }
    this._showingMonthStart = fns.startOfMonth(date);
    this.updateCalendarMonth()
  }
  private _showingMonthStart: Date = fns.startOfMonth(new Date());
  // private compareDate: Date = this._showingMonthStart;
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
    // if (this.calendarMonth) {
    //   let weekIndexOld = this.findWeekIndexOfDate(this.calendarMonth);
    //   let weekIndexNew = this.findWeekIndexOfDate(this.generateCalendarMonth(this._showingMonthStart));
    //   let translateWeeks = weekIndexNew - weekIndexOld;
    // }
    this.calendarMonth = this.generateCalendarMonth(this._showingMonthStart);
  }

  // private findWeekIndexOfDate(calendarMonth: Array<Array<Date>>): number {
  //   return calendarMonth.findIndex((calendarWeek: Array<Date>, index: number) => {
  //     return calendarWeek.findIndex((weekDay: Date) => {
  //       return fns.isEqual(weekDay, this.compareDate)
  //     }) >= 0;
  //   })
  // }

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
    if (this.selectedDate && fns.isEqual(this.selectedDate, date)) {
      classes.push('selected');
    }
    if (!fns.isSameMonth(this._showingMonthStart, date)) {
      classes.push('not-in-month')
    }
    return classes;
  }
}
