import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { mixinFocus, mixinClassName, Color, mixinDisable } from "../../../core";
import * as fns from "date-fns";
import { MarkedDates } from "../marked-dates";


const SbCalendarMonthsCore = mixinDisable(
  mixinFocus(
    mixinClassName(
      class {
        constructor(
          public _elementRef: ElementRef) {}
      }, 'sb-calendar-months'
    )
  )
);

@Component({
  selector: 'sb-calendar-months',
  templateUrl: './calendar-months.component.html',
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'disabled'
  ],
  outputs: [
    'focus',
    'blur'
  ],
})
export class SbCalendarMonthsComponent extends SbCalendarMonthsCore {

  @Input()
  public color: string | undefined = Color.PRIMARY;

  @Input()
  public monthFormat: string = 'MMMM';

  @Output()
  public select: EventEmitter<Date> = new EventEmitter<Date>();
  public handleSelect(date: Date): void {
    this.select.emit(date);
  }

  private _showingYearStart: Date = fns.startOfYear(new Date())
  @Input()
  set showingYearStart(date: Date) {
    this._showingYearStart = fns.startOfYear(date);
    this.updateCalendarMonths()
  }
  get showingYearStart(): Date {
    return this._showingYearStart;
  }

  public calendarMonths!: Array<Date>;

  @Input()
  public markedDates: MarkedDates = new MarkedDates();

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
    this.updateCalendarMonths();
  }

  private updateCalendarMonths(): void {
    this.calendarMonths = new Array<Date>();
    for (let month = 0 ; month < 12 ; month++) {
      this.calendarMonths.push(fns.addMonths(this.showingYearStart, month));
    }
  }

}
