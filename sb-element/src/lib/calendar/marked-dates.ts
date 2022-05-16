import * as fns from "date-fns";

export type SbPeriodLength = 'days' | 'months' | 'years';

export class SbMarkedDates {
  private _start: Date | undefined;
  private _end: Date | undefined;

  get isRange(): boolean {
    if (this.start && this.end) {
      return this.start != this.end;
    } else return false;
  }

  get isRangeDays(): boolean {
    return this.isPeriodRange('days')
  }

  public isPeriodRange(periodLength: SbPeriodLength): boolean {
    if (this.isRange) {
      switch (periodLength) {
        case 'days':
          return !fns.isSameDay(this.start!, this.end!);
        case 'months': 
          return !fns.isSameMonth(this.start!, this.end!);
        case 'years':
          return !fns.isSameYear(this.start!, this.end!);
      }
    }
    return false;
  }

  get start(): Date | undefined { return this._start }
  set start(start: Date | undefined) { this._start = start }
  get date(): Date | undefined { return this._start }
  set date(date: Date | undefined) { this._start = date }

  get end(): Date | undefined { return this._end ? this._end : this._start }
  set end(end: Date | undefined) { this._end = end }

  constructor();
  constructor(date: Date);
  constructor(start: Date, end: Date);
  constructor(dateOrStart?: Date, end?: Date) {
    this.start = dateOrStart;
    this.end = end;
  }

  public isStartOfRange(periodLength: SbPeriodLength, date: Date): boolean {
    return this.isPeriodRange(periodLength) && this.isPeriodStart(periodLength, date);
  }

  public isEndOfRange(periodLength: SbPeriodLength, date: Date): boolean {
    return this.isPeriodRange(periodLength) && this.isPeriodEnd(periodLength, date);
  }

  public isBetweenRange(periodLength: SbPeriodLength, date: Date): boolean {
    if (!this.isPeriodRange(periodLength)) return false;
    if (this.isSame(periodLength, this.start!, this.end!)) return false;

    date = this.startOfPeriod(periodLength, date);
    let start = this.startOfPeriod(periodLength, this.start!);
    let end = this.startOfPeriod(periodLength, this.end!);
    
    return fns.isAfter(date, start) &&
      fns.isBefore(date, end);
  }

  public sort(): void {
    if (this.isRange) {
      if (fns.isAfter(this.start!, this.end!)) {
        let startCopy = this.start;
        this.start = this.end;
        this.end = startCopy;
      }
    }
  }

  private startOfPeriod(periodLength: SbPeriodLength, date: Date): Date {
    switch (periodLength) {
      case 'days':
        return fns.startOfDay(date);
      case 'months': 
      return fns.startOfMonth(date);
      case 'years':
        return fns.startOfYear(date);
    }
  }

  public isStartSamePeriod(periodLength: SbPeriodLength, date: Date): boolean {
    if (this.start) return this.isSame(periodLength, date, this.start);
    return false;
  }

  public isEndSamePeriod(periodLength: SbPeriodLength, date: Date): boolean {
    if (this.end) return this.isSame(periodLength, date, this.end);
    return false;
  }

  private isSame(
    periodLength: SbPeriodLength, 
    dateOne: Date, 
    dateTwo: Date
    ): boolean {
    switch (periodLength) {
      case 'days':
        return fns.isSameDay(dateOne, dateTwo);
      case 'months': 
      return fns.isSameMonth(dateOne, dateTwo);
      case 'years':
        return fns.isSameYear(dateOne, dateTwo);
    } 
  }

  private isPeriodStart(periodLength: SbPeriodLength, date: Date): boolean {
    if (this.start) {
      return this.isSame(periodLength, date, this.start);
    } else {
      return false;
    }
  }

  private isPeriodEnd(periodLength: SbPeriodLength, date: Date): boolean {
    if (this.end) {
      return this.isSame(periodLength, date, this.end);
    } else {
      return false;
    }
  }
}
