import * as fns from 'date-fns';
import { Subject } from 'rxjs';

export type SbDateUnit = 'day' | 'month' | 'year';
export function toDurationKey(unit: SbDateUnit): string {
  return unit + 's';
}

export interface SbRange {
  start: Date,
  end: Date
}

export class SbMarkedDates {
  private _dates: Array<Date> = new Array();
  private _normalizedDates: Array<Date> = new Array();
  private static MAX_MARKABLE_DATES = 2;
  private _maxMarkableDates = SbMarkedDates.MAX_MARKABLE_DATES;

  public onChange: Subject<void> = new Subject();

  constructor(maxMarkableDates: number = SbMarkedDates.MAX_MARKABLE_DATES) {    
    if (maxMarkableDates > SbMarkedDates.MAX_MARKABLE_DATES) {
      throw new Error(`SbMarkedDates: The maximum number of dates that can be marked is `
         + `2, found ${maxMarkableDates}`);
    }
    this._maxMarkableDates = maxMarkableDates;
  }

  public parseAndMark(format: string, ...formattedDates: Array<string>): SbMarkedDates {
    return this.mark(...formattedDates.map((date: string) => {
      return fns.parse(date, format, new Date());
    }).reduce((dates: Array<Date>, date: Date) => {
      if (fns.isValid(date)) {
        dates.push(date);
      }
      return dates;
    }, new Array()))
  }

  public mark(...dates: Array<Date>): SbMarkedDates {
    if (dates.length > this._maxMarkableDates) {
      throw new Error(`SbMarkedDates: The number of dates one can add to a range is `
        + `${this._maxMarkableDates}, found ${dates.length}`);
    }
    if (this._dates.length + dates.length <= this._maxMarkableDates) {
      dates.forEach(date => {
        if (!fns.isValid(date)) {
          throw new Error("SbMarkedDates: All the marked dates must be valid")
        }
      })
      this._dates.push(...dates);
      this._sort();
      this.onChange.next();
    }
    return this;
  }

  public get(index: number, unit?: SbDateUnit): Date | undefined {
    if (index < 0 || index > this._maxMarkableDates) {
      throw new Error(`SbMarkedDates: index ${index} is out of range`);
    }
    if (unit) {
      this._normalize(unit);
      return this._normalizedDates[index];
    }
    return this._dates[index];
  }

  public getFormatted(format: string, index: number): string {
    const date = this.get(index);
    return date ? fns.format(date, format) : '';
  }

  public set(date: Date, index: number): void {
    if (index < 0 || index > this._maxMarkableDates) {
      throw new Error(`SbMarkedDates: index ${index} is out of range`);
    }
    if (!fns.isValid(date)) {
      throw new Error("SbMarkedDates: All the marked dates must be valid")
    }
    this._dates[index] = date;
    this._sort();
    this.onChange.next();
  }

  public setFormatted(formattedDate: string, format: string, index: number): void {
    const date = fns.parse(formattedDate, format, new Date());
    if (fns.isValid(date)) {
      this.set(date, index);
    }
  }

  private _normalize(unit: SbDateUnit): void {
    this._normalizedDates = this._dates.map(date => this._startOfUnit(date, unit));
  }

  public clear(): void {
    this._dates = new Array();
    this._normalizedDates = new Array();
    this.onChange.next();
  }

  public isEqualTo(date: Date, index: number, unit?: SbDateUnit): boolean {
    if (index < 0 || index > this._maxMarkableDates) {
      throw new Error(`SbMarkedDates: index ${index} is out of range`);
    }
    if (unit) {
      date = this._startOfUnit(date, unit);
    }
    const dateToCompare = this.get(index, unit);

    if (dateToCompare) {
      return fns.isEqual(date, dateToCompare);
    }
    return false;
  }

  private _sort(): void {
    this._dates.sort(fns.compareAsc);
  }

  private _startOfUnit(date: Date, unit: SbDateUnit): Date {
    switch (unit) {
      case 'day':
        return fns.startOfDay(date);
      case 'month': 
        return fns.startOfMonth(date);
      case 'year':
        return fns.startOfYear(date);
    }
  }

  // Range Operations with maxMarkable dates == 2

  public isRange(unit?: SbDateUnit): boolean {
    if (this._dates.length == 2) {
      if (unit) {
        this._normalize(unit);
      }
      const range: [Date, Date] = [
        unit ? this._normalizedDates[0] : this._dates[0],
        unit ? this._normalizedDates[1] : this._dates[1]
      ]
      switch (unit) {
        case 'day':
          return !fns.isSameDay(...range);
        case 'month': 
          return !fns.isSameMonth(...range);
        case 'year':
          return !fns.isSameYear(...range);
        default:
          return true;
      }
    }
    return false;
  }

  public toRange(unit?: SbDateUnit): SbRange {
    if (!this.isRange()) {
      throw new Error("SbMarkedDates: The marked dates do not form a range");
    }
    if (unit) {
      this._normalize(unit);
    }
    return {
      start: unit ? this._normalizedDates[0] : this._dates[0],
      end: unit ? this._normalizedDates[1] : this._dates[1]
    }
  }

  public toRangeTuple(unit?: SbDateUnit): [Date, Date] {
    if (!this.isRange()) {
      throw new Error("SbMarkedDates: The marked dates do not form a range");
    }
    if (unit) {
      this._normalize(unit);
    }
    return [
      unit ? this._normalizedDates[0] : this._dates[0],
      unit ? this._normalizedDates[1] : this._dates[1]
    ]
  }

  public isInRange(date: Date, unit?: SbDateUnit, inclusive: boolean = true): boolean {
    if (!this.isRange(unit)) return false;
    if (unit) {
      date = this._startOfUnit(date, unit);
    }
    if (inclusive) return fns.isWithinInterval(date, this.toRange(unit));
    const range = this.toRange(unit);
    return fns.isAfter(date, range.start) &&
      fns.isBefore(date, range.end);
  }

  public isStartOfRange(date: Date, unit?: SbDateUnit): boolean {
    if (!this.isRange(unit)) return false;
    if (unit) {
      date = this._startOfUnit(date, unit);
    }
    const range = this.toRange(unit);
    return fns.isEqual(date, range.start);
  }

  public isEndOfRange(date: Date, unit?: SbDateUnit): boolean {
    if (!this.isRange(unit)) return false;
    if (unit) {
      date = this._startOfUnit(date, unit);
    }
    const range = this.toRange(unit);
    return fns.isEqual(date, range.end);
  }

  public static range(start: Date, end: Date, unit: SbDateUnit = 'day'): SbMarkedDates {
    return new SbMarkedDates().mark(start, end);
  }

  public static single(date: Date, unit: SbDateUnit = 'day'): SbMarkedDates {
    return new SbMarkedDates().mark(date);
  }
}
