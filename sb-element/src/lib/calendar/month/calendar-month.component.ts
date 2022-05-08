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
  mixinColor,
  mixinClassName,
  mixinDisable ,
  mixinTabindex,
  hasElementRefClass} from "../../core";
import { SbMarkedDates } from "../marked-dates";

const SbCalendarMonthCore = mixinDisable(
  mixinTabindex(
    mixinColor(
      mixinClassName(hasElementRefClass, 'sb-calendar-month'),
      Color.PRIMARY
    ),
    0
  )
);

@Component({
  selector: 'sb-calendar-month',
  templateUrl: './calendar-month.component.html',
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
export class SbCalendarMonthComponent extends SbCalendarMonthCore {

  @Output()
  public select: EventEmitter<Date> = new EventEmitter<Date>();

  @Input()
  public monthFormat: string = 'MMMM';

  @Input()
  public month!: Date;

  @Input()
  public markedDates: SbMarkedDates = new SbMarkedDates();

  get isMarked(): boolean {
    return this.markedDates.isRange && (
      this.markedDates.isBetweenMonths(this.month) ||
      this.markedDates.isStartSameMonth(this.month) ||
      this.markedDates.isEndSameMonth(this.month)
    ) ||
    !this.markedDates.isRange && (
      this.markedDates.isStartSameMonth(this.month) &&
      this.markedDates.isEndSameMonth(this.month)
    );
  }

  get isStart(): boolean {
    return this.markedDates.isRangeMonths && this.markedDates.isStartSameMonth(this.month);
  }

  get isEnd(): boolean {
    return this.markedDates.isRangeMonths && this.markedDates.isEndSameMonth(this.month);
  }

  get isBetween(): boolean {
    return this.markedDates.isRangeMonths && this.markedDates.isBetweenMonths(this.month);
  }

  get monthFormatted(): string {
    return fns.format(this.month, this.monthFormat);
  }

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public handleClick(): void {
    if (!this.disabled) {
      this.select.emit(this.month);
    }
  }

}
