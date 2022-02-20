import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { mixinFocus, mixinClassName, Color, mixinDisable } from "../../../core";
import * as fns from "date-fns";
import { MarkedDates } from "../marked-dates";

const SbCalendarYearsCore = mixinDisable(
  mixinFocus(
    mixinClassName(
      class {
        constructor(
          public _elementRef: ElementRef) {}
      }, 'sb-calendar-years'
    )
  )
);

@Component({
  selector: 'sb-calendar-years',
  templateUrl: './calendar-years.component.html',
  styleUrls: ['./calendar-years.component.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'disabled'
  ],
  outputs: [
    'focus',
    'blur'
  ],
})
export class SbCalendarYearsComponent extends SbCalendarYearsCore {

  @Input()
  public color: string = Color.PRIMARY;

  @Input()
  public yearFormat: string = 'yyyy';

  @Output()
  public select: EventEmitter<Date> = new EventEmitter<Date>();
  public handleSelect(date: Date): void {
    this.select.emit(date);
  }

  private _showingVicennialStart: Date = fns.startOfYear(new Date())
  @Input()
  set showingVicennialStart(date: Date) {
    this._showingVicennialStart = fns.startOfYear(date);
    this.updateCalendarYears()
  }
  get showingVicennialStart(): Date {
    return this._showingVicennialStart;
  }

  public calendarYears!: Array<Date>;

  @Input()
  public markedDates: MarkedDates = new MarkedDates();

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
    this.updateCalendarYears();
  }

  private updateCalendarYears(): void {
    this.calendarYears = new Array<Date>();
    for (let year = -10 ; year < 10 ; year++) {
      this.calendarYears.push(fns.addYears(this.showingVicennialStart, year));
    }
  }
}
