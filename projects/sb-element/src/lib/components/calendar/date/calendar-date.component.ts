import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import * as fns from "date-fns";
import { SbThemeService, mixinColor, mixinClassName, mixinTheme, Color, mixinTabindex, mixinDisable } from "../../../core";
import { MarkedDates } from "../marked-dates";

const SbCalendarDateCore = mixinDisable(
  mixinTabindex(
    mixinColor(
      mixinTheme(
        mixinClassName(
          class {
            constructor(
              public _elementRef: ElementRef,
              public _themeService: SbThemeService) {}
          }, 'sb-calendar-date'
        )
      ), Color.PRIMARY
    ), 0
  )
);

@Component({
  selector: 'sb-calendar-date',
  templateUrl: './calendar-date.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.marked]': 'isMarked',
    '[class.start]': 'isStart',
    '[class.end]': 'isEnd',
    '[class.between]': 'isBetween',
    '[class.not-in-month]': 'isNotInMonth',
    '[class.disabled]': 'disabled',
    '(click)': 'handleClick()'
  },
  inputs: [
    'color',
    'disabled'
  ],
})
export class SbCalendarDateComponent extends SbCalendarDateCore {

  @Output()
  public select: EventEmitter<Date> = new EventEmitter<Date>();

  @Input()
  public date!: Date;

  @Input()
  public markedDates: MarkedDates = new MarkedDates();

  @Input()
  public showingMonthStart!: Date;

  get isMarked(): boolean {
    return this.markedDates.isRange && (
      this.markedDates.isBetweenDays(this.date) ||
      this.markedDates.isStartSameDay(this.date) ||
      this.markedDates.isEndSameDay(this.date)
    ) ||
    !this.markedDates.isRange && (
      this.markedDates.isStartSameDay(this.date) &&
      this.markedDates.isEndSameDay(this.date)
    );
  }

  get isStart(): boolean {
    return this.markedDates.isRangeDays && this.markedDates.isStartSameDay(this.date);
  }

  get isEnd(): boolean {
    return this.markedDates.isRangeDays && this.markedDates.isEndSameDay(this.date);
  }

  get isBetween(): boolean {
    return this.markedDates.isRangeDays && this.markedDates.isBetweenDays(this.date);
  }

  get isNotInMonth(): boolean {
    return !fns.isSameMonth(this.showingMonthStart, this.date);
  }

  get dateFormatted(): string {
    return fns.format(this.date, 'dd');
  }

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService
  ) {
    super(elementRef, themeService);
  }

  public handleClick(): void {
    if (!this.disabled) {
      this.select.emit(this.date);
    }
  }

}
