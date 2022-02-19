import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as fns from "date-fns";
import { ThemeService, mixinColor, mixinClassName, mixinTheme, Color, mixinTabindex } from "../../../core";
import { MarkedDates } from "../marked-dates";

const SbCalendarDateCore = mixinTabindex(
  mixinColor(
    mixinTheme(
      mixinClassName(
        class {
          constructor(
            public _elementRef: ElementRef,
            public _themeService: ThemeService) {}
        }, 'sb-calendar-date'
      )
    ), Color.PRIMARY
  ), 0
);

@Component({
  selector: 'sb-calendar-date',
  templateUrl: './calendar-date.component.html',
  styleUrls: ['./calendar-date.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.marked]': 'isMarked',
    '[class.start]': 'isStart',
    '[class.end]': 'isEnd',
    '[class.between]': 'isBetween',
    '[class.not-in-month]': 'isNotInMonth'
  },
  inputs: [
    'color'
  ],
})
export class SbCalendarDateComponent extends SbCalendarDateCore {

  @Input()
  public date!: Date;

  @Input()
  public markedDates: MarkedDates = new MarkedDates();

  @Input()
  public showingMonthStart!: Date;

  get isMarked(): boolean {
    return !this.markedDates.startEqualsEnd && (
      this.markedDates.isBetween(this.date) ||
      this.markedDates.isStartSameDay(this.date) ||
      this.markedDates.isEndSameDay(this.date)
    ) ||
    this.markedDates.startEqualsEnd && (
      this.markedDates.isStartSameDay(this.date) &&
      this.markedDates.isEndSameDay(this.date)
    );
  }

  get isStart(): boolean {
    return !this.markedDates.startEqualsEnd && this.markedDates.isStartSameDay(this.date);
  }

  get isEnd(): boolean {
    return !this.markedDates.startEqualsEnd && this.markedDates.isEndSameDay(this.date);
  }

  get isBetween(): boolean {
    return !this.markedDates.startEqualsEnd && this.markedDates.isBetween(this.date);
  }

  get isNotInMonth(): boolean {
    return !fns.isSameMonth(this.showingMonthStart, this.date);
  }

  get dateFormatted(): string {
    return fns.format(this.date, 'dd');
  }

  constructor(
    elementRef: ElementRef,
    themeService: ThemeService
  ) {
    super(elementRef, themeService);
  }

}
