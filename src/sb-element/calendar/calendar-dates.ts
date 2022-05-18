import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation } from '@angular/core';
import * as fns from "date-fns";
import {
  Color,
  hasElementRefClass,
  mixinClassName,
  mixinColor,
  mixinDisable,
  mixinFocus } from "../core";
import { SbMarkedDates } from "./marked-dates";

const SbCalendarDatesCore = mixinDisable(
  mixinFocus(
    mixinColor(
      mixinClassName(hasElementRefClass, 'sb-calendar-dates'),
      Color.PRIMARY
    )
  )
);

@Component({
  selector: 'sb-calendar-dates',
  templateUrl: './calendar-dates.html',
  styleUrls: ['./calendar-dates.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'color',
    'disabled'
  ],
  outputs: [
    'blur',
    'focus'
  ],
})
export class SbCalendarDatesComponent extends SbCalendarDatesCore {

  @Input()
  public weekDayFormat: string = 'EEEEEE';

  @Output()
  public select: EventEmitter<Date> = new EventEmitter<Date>();
  public handleSelect(date: Date): void {
    if (fns.isSameMonth(this.showingMonthStart, date)) {
      this.select.emit(date);
    }
  }

  @Input()
  public markedDates: SbMarkedDates = new SbMarkedDates();

  @Input()
  set showingMonthStart(date: Date) {
    this._showingMonthStart = fns.startOfMonth(date);
    this.updateCalendarDates()
  }
  get showingMonthStart(): Date {
    return this._showingMonthStart;
  }
  private _showingMonthStart: Date = fns.startOfMonth(new Date());
  public calendarDates!: Array<Date>;
  public weekDays: Array<string> = new Array<string>();

  constructor(elementRef: ElementRef) {
    super(elementRef);
    this.updateCalendarDates();
    this.createWeekDays();
  }

  private createWeekDays(): void {
    let date = fns.setDay(new Date(), 1);
    for (let weekDay = 1 ; weekDay <= 7 ; weekDay++) {
      this.weekDays.push(fns.format(date, this.weekDayFormat))
      date = fns.addDays(date, 1);
    }
  }

  private updateCalendarDates(): void {
    this.calendarDates = new Array<Date>();
    let calendarMonthStart = this.showingMonthStart;
    if (fns.isMonday(this.showingMonthStart)) {
      calendarMonthStart = fns.subWeeks(this.showingMonthStart, 1);
    }
    calendarMonthStart = fns.startOfWeek(calendarMonthStart, {weekStartsOn : 1});

    for (let day = 0 ; day < 42 ; day++) {
      this.calendarDates.push(fns.addDays(calendarMonthStart, day));
    }
  }

  public isNotInMonth(date: Date): boolean {
    return !fns.isSameMonth(this._showingMonthStart, date);
  }
}
