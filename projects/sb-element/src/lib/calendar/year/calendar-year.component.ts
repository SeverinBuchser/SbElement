import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { SbThemeService, mixinColor, mixinClassName, Color, mixinTabindex, mixinDisable } from "../../core";
import * as fns from "date-fns";
import { MarkedDates } from "../marked-dates";

const SbCalendarYearCore = mixinDisable(
  mixinTabindex(
    mixinColor(
      mixinClassName(
        class {
          constructor(
            public _elementRef: ElementRef,
            public _themeService: SbThemeService) {}
        }, 'sb-calendar-year'
      ), Color.PRIMARY
    ), 0
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
  public markedDates: MarkedDates = new MarkedDates();

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

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService
  ) {
    super(elementRef, themeService);
  }

  public handleClick(): void {
    if (!this.disabled) {
      this.select.emit(this.year);
    }
  }

}
