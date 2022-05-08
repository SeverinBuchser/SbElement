import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import * as fns from "date-fns";
import { mixinDisable, mixinFocus, Color, Size } from "../../../core";
import { SbMarkedDates } from "../../../calendar";
import { SbDoubleInput } from "../../input";

const SbDateRangeInputCore = mixinDisable(mixinFocus(class {}));

@Component({
  selector: 'sb-input[type=date-range]',
  templateUrl: './date-range-input.component.html',
  inputs: [
    'disabled'
  ],
  outputs: [
    'blur',
    'focus'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbDateRangeInputComponent,
    multi: true
  }]
})
export class SbDateRangeInputComponent extends SbDateRangeInputCore
  implements ControlValueAccessor {

  @Input()
  public color: string = Color.PRIMARY;

  @Input()
  public size: string = Size.MEDIUM;

  @Input('pill')
  public isPill: boolean | string = false;

  @Input()
  public position: string = 'bottom-center';

  @Input()
  public format: string = 'yyyy-MM-dd';

  public markedDates: SbMarkedDates = new SbMarkedDates();
  private pickerMarkedDates: SbMarkedDates = new SbMarkedDates();
  public doubleInputDates: SbDoubleInput<string> = new SbDoubleInput();

  private onChange: (dates: SbMarkedDates) => void = () => {};
  private onTouch: () => void = () => {};

  public handlePickerSelect(date: Date): void {
    if (this.pickerMarkedDates.isRangeDays || !this.pickerMarkedDates.start) {
      this.pickerMarkedDates = new SbMarkedDates();
      this.pickerMarkedDates.start = date;
    } else {
      this.pickerMarkedDates.end = date;
    }
    if (this.doUpdate(this.pickerMarkedDates)) {
      this.pickerMarkedDates.sort();
      this.markedDates = this.pickerMarkedDates;
      this.updateInput();
      this.onChange(this.pickerMarkedDates);
    }
  }

  public handleInput(dates: SbDoubleInput<string>): void {
    const startDateString = dates.first;
    const endDateString = dates.second;

    var startDate = startDateString ? fns.parseISO(startDateString) : undefined;
    var endDate = endDateString ? fns.parseISO(endDateString) : undefined;

    const markedDates = new SbMarkedDates();

    if (fns.isValid(startDate)) {
      markedDates.start = startDate;
    }

    if (fns.isValid(endDate)) {
      markedDates.end = endDate;
    }

    if (this.doUpdate(markedDates)) {
      markedDates.sort();
      this.markedDates = markedDates;
      this.onChange(markedDates);
    }
  }

  private updateInput(): void {
    if (this.markedDates.start && this.markedDates.end) {
      this.doubleInputDates = new SbDoubleInput(
        fns.format(this.markedDates.start, this.format),
        fns.format(this.markedDates.end, this.format)
      );
    }
  }

  public writeValue(dates: SbMarkedDates): void {
    if (this.doUpdate(dates)) {
      dates.sort();
      this.markedDates = dates;
      this.updateInput();
    }
  }

  private doUpdate(dates: SbMarkedDates): boolean {
    if (dates && dates.start && dates.end) {
      const isStartDateValid = fns.isValid(dates.start);
      const isEndDateValid = fns.isValid(dates.end);
      if (isStartDateValid && isEndDateValid) {
        return true;
      }
    }
    return false;
  }

  public registerOnChange(fn: (dates: SbMarkedDates) => void): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  protected onBlur(): void { this.onTouch() }

}
