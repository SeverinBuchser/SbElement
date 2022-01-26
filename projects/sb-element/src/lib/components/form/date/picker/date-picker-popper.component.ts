import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SizeThemeColorInputDirective } from "../../../../core";
import * as fns from "date-fns";

@Component({
  selector: 'sb-date-picker-popper',
  templateUrl: './date-picker-popper.component.html'
})
export class DatePickerPopperComponent extends SizeThemeColorInputDirective {

  public rootClass = 'sb-date-picker-popper';

  @Input()
  public isRange: boolean = false;

  @Input()
  public format: string = 'yyyy-MM-dd';

  @Output()
  public select: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

  public markedDates: Array<Date> = new Array<Date>();
  public showingMonthStart: Date = fns.startOfMonth(new Date());

  @Input()
  set date(dates: Array<string> | undefined) {
    if (dates && Array.isArray(dates) && dates.length > 0) {
      this.markedDates = dates.map((date: string) => fns.parseISO(date));

      if (!fns.isEqual(this.showingMonthStart, fns.startOfMonth(this.markedDates[0]))) {
        this.showingMonthStart = fns.startOfMonth(this.markedDates[0]);
      }
    }
  };

  private addToMarked(date: Date): boolean {
    if (this.isRange) {
      if (this.markedDates.length == 2) {
        this.markedDates = new Array<Date>();
        this.markedDates.push(date);
      } else {
        this.markedDates.push(date);
        this.markedDates.sort((a: Date, b: Date) => {
          return fns.isAfter(a, b) ? 1 : -1;
        })
      }
      return this.markedDates.length == 2;
    } else {
      this.markedDates = [date];
      return true;
    }
  }

  private emit(): void {
    this.select.emit(this.markedDates.map((date: Date) => {
      return fns.format(date, this.format);
    }));
  }

  public handleSelect(date: Date): void {
    if (this.isRange) {
      if (this.addToMarked(date)) {
        this.emit();
      }
    } else if (this.addToMarked(date)) {
      this.emit();
    }
  }

  public previousYear(): void {
    this.showingMonthStart = fns.subYears(this.showingMonthStart, 1);
  }
  public nextYear(): void {
    this.showingMonthStart = fns.addYears(this.showingMonthStart, 1);
  }

  public previousMonth(): void {
    this.showingMonthStart = fns.subMonths(this.showingMonthStart, 1);
  }
  public nextMonth(): void {
    this.showingMonthStart = fns.addMonths(this.showingMonthStart, 1);
  }

  public toString = (): string => {
    if (this.markedDates.length == 2) {
      let dateStartFormatted = fns.format(this.markedDates[0], this.format);
      let dateEndFormatted = fns.format(this.markedDates[1], this.format);
      return dateStartFormatted + ' ' + dateEndFormatted;
    } else if (this.markedDates.length == 1) {
      return fns.format(this.markedDates[0], this.format);
    } else {
      return ""
    }
  }

}
