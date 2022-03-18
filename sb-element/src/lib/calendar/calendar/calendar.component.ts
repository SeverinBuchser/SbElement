import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Color, mixinClassName, mixinColor, mixinDisable, mixinFocus } from "../../core";
import * as fns from "date-fns";
import { MarkedDates } from "../marked-dates";

const SbCalendarCore = mixinDisable(
  mixinFocus(
    mixinColor(
      mixinClassName(
        class {
          constructor(public _elementRef: ElementRef) {}
        }, 'sb-calendar'
      ), Color.PRIMARY
    )
  )
);

@Component({
  selector: 'sb-calendar',
  templateUrl: './calendar.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.disabled]': 'disabled'
  },
  inputs: [
    'color',
    'disabled'
  ],
  outputs: [
    'focus',
    'blur'
  ],
})
export class SbCalendarsComponent extends SbCalendarCore {

  @Input()
  public weekDayFormat: string = 'EEEEEE';

  @Input()
  public monthFormat: string = 'MMMM';

  @Input()
  public yearFormat: string = 'yyyy';

  @Input()
  public monthYearFormat: string = 'MMM. yyyy';

  @Output()
  public select: EventEmitter<Date> = new EventEmitter<Date>();

  private _markedDates: MarkedDates = new MarkedDates();

  public showingDate: Date = fns.startOfMonth(new Date());

  private _selectionMode: 'date' | 'month' | 'year' = 'date';
  @Input()
  set selectionMode(selectionMode: 'date' | 'month' | 'year') {
    this._selectionMode = selectionMode;
    this.navigationMode = selectionMode;
  }
  get selectionMode(): 'date' | 'month' | 'year' {
    return this._selectionMode;
  }

  public navigationMode: 'date' | 'month' | 'year' = 'date';
  get navigationFormatted(): string {
    if (this.showingDate) {
      if (this.navigationMode == 'date') {
        return fns.format(this.showingDate, this.monthYearFormat);
      } else if (this.navigationMode == 'month') {
        return fns.format(this.showingDate, this.yearFormat);
      } else if (this.navigationMode == 'year') {
        let startFormat = fns.format(fns.subYears(this.showingDate, 10), this.yearFormat);
        let endFormat = fns.format(fns.addYears(this.showingDate, 9), this.yearFormat);
        return `${startFormat} - ${endFormat}`;
      } else return '';
    } else return '';
  }

  @Input()
  set markedDates(markedDates: MarkedDates) {
    this._markedDates = markedDates;
    if (this._markedDates.start) {
      if (!fns.isEqual(this.showingDate, fns.startOfMonth(this._markedDates.start))) {
        this.showingDate = fns.startOfMonth(this._markedDates.start);
      }
    } else if (this._markedDates.end) {
      if (!fns.isEqual(this.showingDate, fns.startOfMonth(this._markedDates.end))) {
        this.showingDate = fns.startOfMonth(this._markedDates.end);
      }
    }
  };

  get markedDates(): MarkedDates { return this._markedDates }

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

  public handleNavigationMode(): void {
    if (this.navigationMode == 'date') {
      this.navigationMode = 'month';
    } else if (this.navigationMode == 'month') {
      this.navigationMode = 'year';
    } else if (this.navigationMode == 'year') {
      this.navigationMode = this.selectionMode;
    }
  }

  public handleDateSelect(date: Date): void {
    if (this.selectionMode == 'date') {
      this.select.emit(date);
    }
  }

  public handleMonthSelect(month: Date): void {
    if (this.selectionMode == 'month') {
      this.select.emit(month);
    }  else if (this.showingDate) {
      this.showingDate = fns.setMonth(this.showingDate, fns.getMonth(month));
      this.navigationMode = this.selectionMode;
    }
  }

  public handleYearSelect(year: Date): void {
    if (this.selectionMode == 'year') {
      this.select.emit(year);
    }  else if (this.showingDate) {
      this.showingDate = fns.setYear(this.showingDate, fns.getYear(year));
      this.navigationMode = this.selectionMode;
    }
  }

  public goToPreviousBig(): void {
    if (this.showingDate) {
      if (this.navigationMode == 'date') {
        this.addYears(-1);
      } else if (this.navigationMode == 'month') {
        this.addYears(-20);
      } else if (this.navigationMode == 'year') {
        this.addYears(-100);
      }
    }
  }

  public goToPreviousSmall(): void {
    if (this.showingDate) {
      if (this.navigationMode == 'date') {
        this.addMonths(-1);
      } else if (this.navigationMode == 'month') {
        this.addYears(-1);
      } else if (this.navigationMode == 'year') {
        this.addYears(-20);
      }
    }
  }

  public goToNextBig(): void {
    if (this.showingDate) {
      if (this.navigationMode == 'date') {
        this.addYears(1);
      } else if (this.navigationMode == 'month') {
        this.addYears(20);
      } else if (this.navigationMode == 'year') {
        this.addYears(100);
      }
    }
  }

  public goToNextSmall(): void {
    if (this.showingDate) {
      if (this.navigationMode == 'date') {
      this.addMonths(1);
      } else if (this.navigationMode == 'month') {
      this.addYears(1);
      } else if (this.navigationMode == 'year') {
      this.addYears(20);
      }
    }
  }

  public addYears(years: number): void {
    if (this.showingDate) {
      this.showingDate = fns.addYears(this.showingDate, years);
    }
  }

  public addMonths(months: number): void {
    if (this.showingDate) {
      this.showingDate = fns.addMonths(this.showingDate, months);
    }
  }

}
