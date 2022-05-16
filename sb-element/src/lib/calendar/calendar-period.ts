import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation } from '@angular/core';
import * as fns from "date-fns";
import {
  Color,
  hasElementRefClass,
  mixinClassName,
  mixinDisable,
  mixinFocus } from "../core";
import { SbMarkableDateConfig } from './markable-config';
import { SbMarkedDates } from "./marked-dates";

const SbCalendarPeriodCore = mixinDisable(
  mixinFocus(
    mixinClassName(hasElementRefClass, 'sb-calendar-period')
  )
);

export interface SbPeriodConfig extends SbMarkableDateConfig {
  min: number;
  max: number;
  columns: number;
  rows: number;
}

@Component({
  selector: 'sb-calendar-period',
  templateUrl: './calendar-period.html',
  styleUrls: ['./calendar-period.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'disabled'
  ],
  outputs: [
    'blur',
    'focus'
  ],
})
export class SbCalendarPeriodComponent extends SbCalendarPeriodCore {

  @Output()
  public select: EventEmitter<Date> = new EventEmitter<Date>();
  
  @Input()
  public color: string | undefined = Color.PRIMARY;

  @Input()
  public config?: SbPeriodConfig; 

  @Input()
  public showingStartDate: Date = fns.startOfYear(new Date())

  @Input()
  public markedDates: SbMarkedDates = new SbMarkedDates();

  public dates: Array<Date> = new Array();

  @HostBinding('style.gridTemplateColumns') get templateColumns(): string {
    if (!this.config) {
      throw new Error("SbCalendarPeriodComponent: Config not found.");
    }
    return `repeat(${this.config.columns}, 1fr)`;
  }; 
  @HostBinding('style.gridTemplateRows') get templateRows(): string {
    if (!this.config) {
      throw new Error("SbCalendarPeriodComponent: Config not found.");
    }
    return `repeat(${this.config.rows}, 1fr)`;
  }; 

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
  
  public ngOnInit(): void {
    if (!this.config) {
      throw new Error("SbCalendarPeriodComponent: Config not found.");
    }
    this.showingStartDate = fns.startOfYear(this.showingStartDate)
    this._buildDates();
  }

  public handleSelect(date: Date): void {
    if (!this.disabled) {
      this.select.emit(date);
    }
  }

  private _buildDates(): void {
    this.dates = new Array<Date>();
    for (let date = this.config!.min ; date < this.config!.max ; date++) {
      this.dates.push(fns.add(this.showingStartDate, {
        [this.config!.periodLength]: date
      }))
    }
    
  }
}
