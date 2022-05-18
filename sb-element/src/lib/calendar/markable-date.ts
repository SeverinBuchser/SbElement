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
import { SbDateUnit, SbMarkedDates } from "./marked-dates";

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
    '[class.start]': 'markedDates.isStartOfRange(date, unit)',
    '[class.end]': 'markedDates.isEndOfRange(date, unit)',
    '[class.between]': 'markedDates.isInRange(date, unit, false)',
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

  get unit(): SbDateUnit {
    if (!this.config) {
      throw new Error("SbMarkableDateComponent: Config not found.");
    }
    return this.config.unit;
  }

  @Input()
  public date: Date = new Date();

  @Input()
  public markedDates: SbMarkedDates = new SbMarkedDates();

  get isMarked(): boolean {
    return this.markedDates.isInRange(this.date, this.unit) 
      || this.markedDates.isEqualTo(this.date, 0, this.unit);
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
