import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as fns from "date-fns";
import { PopperService } from "../../../services/popper/popper.service";
import { ThemeService } from "../../../services/theme/theme.service";
import { PopperDirective } from "../../popper/popper.directive";


@Component({
  selector: 'sb-el-date-picker-popper',
  templateUrl: './date-picker-popper.component.html'
})
export class DatePickerPopperComponent extends PopperDirective {

  public rootClass = 'sb-el-date-picker-popper';

  @Output()
  public select: EventEmitter<string> = new EventEmitter<string>();
  public handleSelect(date: Date): void {
    if (fns.isSameMonth(date, this.showingMonthStart)) {
      this.select.emit(fns.format(date, 'yyyy-MM-dd'));
      this.popperService.unpop();
    }
  }

  private selectedDate?: Date;
  private showingMonthStart: Date = fns.startOfMonth(new Date());
  public calendarMonth!: Array<Array<Date>>;


  @Input()
  set date(date: string | undefined | Date) {
    if (date && typeof date === 'string') {
      this.selectedDate = fns.parseISO(date);
      this.showingMonthStart = fns.startOfMonth(fns.parseISO(date));

      this.updateCalendar();
    }
  };

  get showingFormat(): string {
    return fns.format(this.showingMonthStart, 'MMM. yyyy');
  }

  constructor(
    private popperService: PopperService,
    themeService: ThemeService
  ) {
    super(themeService);
    this.updateCalendar();
  }

  private updateCalendar(): void {
    this.calendarMonth = new Array<Array<Date>>();
    let calendarMonthStart = fns.startOfWeek(this.showingMonthStart, { weekStartsOn : 1 });

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

  public previousYear(): void {
    this.showingMonthStart = fns.subYears(this.showingMonthStart, 1);
    this.updateCalendar();
  }
  public nextYear(): void {
    this.showingMonthStart = fns.addYears(this.showingMonthStart, 1);
    this.updateCalendar();
  }

  public previousMonth(): void {
    this.showingMonthStart = fns.subMonths(this.showingMonthStart, 1);
    this.updateCalendar();
  }
  public nextMonth(): void {
    this.showingMonthStart = fns.addMonths(this.showingMonthStart, 1);
    this.updateCalendar();
  }


  public getClaendarMonthClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push(this.rootClass + '__calendar-month');
    return classes;
  }

  public getClaendarDateClasses(date: Date): Array<string> {
    let classes = new Array<string>();
    classes.push(this.rootClass + '__calendar-date');
    if (this.selectedDate && fns.isEqual(this.selectedDate, date)) {
      classes.push('selected');
    }
    if (!fns.isSameMonth(this.showingMonthStart, date)) {
      classes.push('not-in-month')
    }
    return classes;
  }

}
