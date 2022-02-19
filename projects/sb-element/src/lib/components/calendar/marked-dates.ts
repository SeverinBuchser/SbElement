import * as fns from "date-fns";

export class MarkedDates {
  private _start: Date | undefined;
  private _end: Date | undefined;

  get startEqualsEnd(): boolean {
    if (this.start && this.end) {
      return fns.isEqual(this.start, this.end);
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

  public isEnd(date: Date): boolean {
    if (this.end) return fns.isEqual(date, this.end);
    else return false;
  }

  isEndSameDay(date: Date): boolean {
    if (this.end) return fns.isSameDay(date, this.end);
    return false;
  }

  public isBetween(date: Date): boolean {
    if (this.start && this.end) {
      if (fns.isEqual(this.start, this.end)) return false;
      return fns.isAfter(date, this.start) && fns.isBefore(date, this.end);
    } else return false;
  }

  public sort(): void {
    if (!this.startEqualsEnd && this.start && this.end) {
      if (fns.isAfter(this.start, this.end)) {
        let startCopy = this.start;
        this.start = this.end;
        this.end = startCopy;
      }
    }
  }
}
