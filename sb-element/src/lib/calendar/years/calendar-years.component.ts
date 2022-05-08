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
  mixinDisable,
  mixinFocus } from "../../core";
import { SbMarkedDates } from "../marked-dates";

const SbCalendarYearsCore = mixinDisable(
  mixinFocus(
    mixinClassName(hasElementRefClass, 'sb-calendar-years')
  )
);

@Component({
  selector: 'sb-calendar-years',
  templateUrl: './calendar-years.component.html',
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'disabled'
  ],
  outputs: [
    'blur',
    'focus'
  ],
})
export class SbCalendarYearsComponent extends SbCalendarYearsCore {

  @Input()
  public color: string | undefined = Color.PRIMARY;

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
  public markedDates: SbMarkedDates = new SbMarkedDates();

  constructor(elementRef: ElementRef) {
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
