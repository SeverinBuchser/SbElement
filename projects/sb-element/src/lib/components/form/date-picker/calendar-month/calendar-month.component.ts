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
    this._showingMonthStart = fns.startOfMonth(date);
    this.updateCalendarMonth()
  }
  private _showingMonthStart: Date = fns.startOfMonth(new Date());
  public calendarMonth!: Array<Array<Date>>;

  constructor(themeService: ThemeService) {
    super(themeService);
    this.updateCalendarMonth();
  }

  private updateCalendarMonth(): void {
    this.calendarMonth = new Array<Array<Date>>();
    let calendarMonthStart = this._showingMonthStart;
    if (fns.isMonday(this._showingMonthStart)) {
      calendarMonthStart = fns.subWeeks(this._showingMonthStart, 1);
    }
    calendarMonthStart = fns.startOfWeek(calendarMonthStart, { weekStartsOn : 1 });

    for (let week = 0 ; week < 6 ; week++) {
      let calendarWeek = new Array<Date>();
      for (let day = 0 ; day < 7 ; day++) {
        calendarWeek.push(fns.addDays(calendarMonthStart, week * 7 + day));
      }
      this.calendarMonth.push(calendarWeek);
    }
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
