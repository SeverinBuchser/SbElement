import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SizeThemeColorInputDirective } from "../../../../core";
import * as fns from "date-fns";
import { MarkedDates } from "../marked-dates";

@Component({
  selector: 'sb-date-picker-popper',
  templateUrl: './date-picker-popper.component.html'
})
export class DatePickerPopperComponent extends SizeThemeColorInputDirective {

  @Input()
  public format: string = 'yyyy-MM-dd';

  @Output()
  public select: EventEmitter<Date> = new EventEmitter<Date>();

  @Input()
  public marked: Array<Date> = new Array<Date>();

  private _markedDates: MarkedDates = new MarkedDates();

  public showingMonthStart: Date = fns.startOfMonth(new Date());

  @Input()
  set markedDates(markedDates: MarkedDates) {
    this._markedDates = markedDates;
    if (this._markedDates.start) {
      if (!fns.isEqual(this.showingMonthStart, fns.startOfMonth(this._markedDates.start))) {
        this.showingMonthStart = fns.startOfMonth(this._markedDates.start);
      }
    } else if (this._markedDates.end) {
      if (!fns.isEqual(this.showingMonthStart, fns.startOfMonth(this._markedDates.end))) {
        this.showingMonthStart = fns.startOfMonth(this._markedDates.end);
      }
    }
  };

  get markedDates(): MarkedDates { return this._markedDates }

  public handleSelect(date: Date): void {
    this.select.emit(date);
  }

}
