import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {
  Color,
  hasElementRefClass,
  mixinClassName,
  mixinColor,
  mixinDisable,
  mixinTabindex
} from "../core";
import { SbMarkableDateConfig } from './markable-config';
import { SbMarkedDates } from "./marked-dates";

const SbMarkableDateCore = mixinDisable(
  mixinTabindex(
    mixinColor(
      mixinClassName(hasElementRefClass, 'sb-markable-date'),
      Color.PRIMARY
    ),
    0
  )
);

@Component({
  selector: 'sb-markable-date',
  templateUrl: './markable-date.html',
  styleUrls: ['./markable-date.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.marked]': 'isMarked',
    '[class.start]': 'markedDates.isStartOfRange(config.periodLength, date)',
    '[class.end]': 'markedDates.isEndOfRange(config.periodLength, date)',
    '[class.between]': 'markedDates.isBetweenRange(config.periodLength, date)',
    '[class.disabled]': 'disabled',
    '(click)': 'handleClick()'
  },
  inputs: [
    'color',
    'disabled'
  ],
})
export class SbMarkableDateComponent extends SbMarkableDateCore {

  @Output()
  public select: EventEmitter<Date> = new EventEmitter();

  @Input()
  public config?: SbMarkableDateConfig;

  @Input()
  public date: Date = new Date();

  @Input()
  public markedDates: SbMarkedDates = new SbMarkedDates();

  get isMarked(): boolean {
    if (!this.config) {
      throw new Error("SbMarkableDateComponent: Config not found.");
    }
    return (
      this.markedDates.isBetweenRange(this.config.periodLength, this.date) ||
      this.markedDates.isStartOfRange(this.config.periodLength, this.date) ||
      this.markedDates.isEndOfRange(this.config.periodLength, this.date)
    ) ||
    !this.markedDates.isRange && (
      this.markedDates.isStartSamePeriod(this.config.periodLength, this.date) &&
      this.markedDates.isEndSamePeriod(this.config.periodLength, this.date)
    );
  }

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public handleClick(): void {
    if (!this.disabled) {
      this.select.emit(this.date);
    }
  }

}
