import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as fns from "date-fns";
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
    if (fns.isSameMonth(date, this.dateObject)) {
      this.select.emit(fns.format(date, 'yyyy-MM-dd'));
    }
  }

  private dateObject: Date = new Date();
  public calendarMonth!: Array<Array<Date>>;


  @Input()
  set date(dateString: string | undefined) {
    if (dateString) {
      this.dateObject = fns.parseISO(dateString);
      this.updateCalendar();
    }
  };

  get dateFormat(): string {return fns.format(this.dateObject, 'dd MMM. yyyy');}

  constructor() {
    super();
    this.updateCalendar();
  }

  private updateCalendar(): void {
    this.calendarMonth = new Array<Array<Date>>();
    let calendarMonthStart = fns.addDays(fns.startOfWeek(fns.startOfMonth(
      this.dateObject)), 1);

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

}
