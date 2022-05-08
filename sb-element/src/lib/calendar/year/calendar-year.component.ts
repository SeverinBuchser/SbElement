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
  mixinTabindex } from "../../core";
import { SbMarkedDates } from "../marked-dates";

const SbCalendarYearCore = mixinDisable(
  mixinTabindex(
    mixinColor(
      mixinClassName(hasElementRefClass, 'sb-calendar-year'),
      Color.PRIMARY
    ),
    0
  )
);

@Component({
  selector: 'sb-calendar-year',
  templateUrl: './calendar-year.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.marked]': 'isMarked',
    '[class.start]': 'isStart',
    '[class.end]': 'isEnd',
    '[class.between]': 'isBetween',
    '[class.disabled]': 'disabled',
    '(click)': 'handleClick()'
  },
  inputs: [
    'color',
    'disabled'
  ],
})
export class SbCalendarYearComponent extends SbCalendarYearCore {

  @Output()
  public select: EventEmitter<Date> = new EventEmitter<Date>();

  @Input()
  public yearFormat: string = 'yyyy';

  @Input()
  public year!: Date;

  @Input()
  public markedDates: SbMarkedDates = new SbMarkedDates();

  get isMarked(): boolean {
    return this.markedDates.isRange && (
      this.markedDates.isBetweenYears(this.year) ||
      this.markedDates.isStartSameYear(this.year) ||
      this.markedDates.isEndSameYear(this.year)
    ) ||
    !this.markedDates.isRange && (
      this.markedDates.isStartSameYear(this.year) &&
      this.markedDates.isEndSameYear(this.year)
    );
  }

  get isStart(): boolean {
    return this.markedDates.isRangeYears && this.markedDates.isStartSameYear(this.year);
  }

  get isEnd(): boolean {
    return this.markedDates.isRangeYears && this.markedDates.isEndSameYear(this.year);
  }

  get isBetween(): boolean {
    return this.markedDates.isRangeYears && this.markedDates.isBetweenYears(this.year);
  }

  get yearFormatted(): string {
    return fns.format(this.year, this.yearFormat);
  }

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public handleClick(): void {
    if (!this.disabled) {
      this.select.emit(this.year);
    }
  }

}
