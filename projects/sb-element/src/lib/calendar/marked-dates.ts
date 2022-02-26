import * as fns from "date-fns";

export class MarkedDates {
  private _start: Date | undefined;
  private _end: Date | undefined;

  get isRange(): boolean {
    if (this.start && this.end) {
      return this.start != this.end;
    } else return false;
  }

  get isRangeDays(): boolean {
    if (this.start && this.end) {
      if (this.start != this.end) {
        return !fns.isSameDay(this.start, this.end);
      } else return false;
    } else return false;
  }

  get isRangeMonths(): boolean {
    if (this.start && this.end) {
      if (this.start != this.end) {
        return !fns.isSameMonth(this.start, this.end);
      } else return false;
    } else return false;
  }

  get isRangeYears(): boolean {
    if (this.start && this.end) {
      if (this.start != this.end) {
        return !fns.isSameYear(this.start, this.end);
      } else return false;
    } else return false;
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

  public isStart(date: Date): boolean {
    if (this.start) return fns.isEqual(date, this.start);
    else return false;
  }

  public isStartSameDay(date: Date): boolean {
    if (this.start) return fns.isSameDay(date, this.start);
    else return false;
  }

  public isStartSameMonth(date: Date): boolean {
    if (this.start) return fns.isSameMonth(date, this.start);
    else return false;
  }

  public isStartSameYear(date: Date): boolean {
    if (this.start) return fns.isSameYear(date, this.start);
    else return false;
  }

  public isEnd(date: Date): boolean {
    if (this.end) return fns.isEqual(date, this.end);
    else return false;
  }

  public isEndSameDay(date: Date): boolean {
    if (this.end) return fns.isSameDay(date, this.end);
    return false;
  }

  public isEndSameMonth(date: Date): boolean {
    if (this.end) return fns.isSameMonth(date, this.end);
    else return false;
  }

  public isEndSameYear(date: Date): boolean {
    if (this.end) return fns.isSameYear(date, this.end);
    else return false;
  }

  public isBetween(date: Date): boolean {
    if (this.start && this.end) {
      if (fns.isEqual(this.start, this.end)) return false;
      return fns.isAfter(date, this.start) && fns.isBefore(date, this.end);
    } else return false;
  }

  public isBetweenDays(date: Date): boolean {
    if (this.start && this.end) {
      if (fns.isSameDay(this.start, this.end)) return false;
      let dateStartOfDay = fns.startOfDay(date);
      let startStartOfDay = fns.startOfDay(this.start);
      let endStartOfDay = fns.startOfDay(this.end);
      return fns.isAfter(dateStartOfDay, startStartOfDay) &&
        fns.isBefore(dateStartOfDay, endStartOfDay);
    } else return false;
  }

  public isBetweenMonths(date: Date): boolean {
    if (this.start && this.end) {
      if (fns.isSameMonth(this.start, this.end)) return false;
      let dateStartOfMonth = fns.startOfMonth(date);
      let startStartOfMonth = fns.startOfMonth(this.start);
      let endStartOfMonth = fns.startOfMonth(this.end);
      return fns.isAfter(dateStartOfMonth, startStartOfMonth) &&
        fns.isBefore(dateStartOfMonth, endStartOfMonth);
    } else return false;
  }

  public isBetweenYears(date: Date): boolean {
    if (this.start && this.end) {
      if (fns.isSameYear(this.start, this.end)) return false;
      let dateStartOfMonth = fns.startOfYear(date);
      let startStartOfMonth = fns.startOfYear(this.start);
      let endStartOfMonth = fns.startOfYear(this.end);
      return fns.isAfter(dateStartOfMonth, startStartOfMonth) &&
        fns.isBefore(dateStartOfMonth, endStartOfMonth);
    } else return false;
  }

  public sort(): void {
    if (this.isRange && this.start && this.end) {
      if (fns.isAfter(this.start, this.end)) {
        let startCopy = this.start;
        this.start = this.end;
        this.end = startCopy;
      }
    }
  }
}
