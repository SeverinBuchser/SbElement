import { Component, Input } from '@angular/core';
import { mixinDisable, mixinFocus, Color, Size } from "../../../../core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import * as fns from "date-fns";
import { SbDoubleInput } from "../../input";
import { MarkedDates } from "../../../calendar";

const SbDateRangePickerCore = mixinDisable(mixinFocus(class {}));

@Component({
  selector: 'sb-input[type=date-range]',
  templateUrl: './date-range-picker.component.html',
  inputs: [
    'disabled'
  ],
  outputs: [
    'focus',
    'blur'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DateRangePickerComponent,
    multi: true
  }]
})
export class DateRangePickerComponent extends SbDateRangePickerCore implements ControlValueAccessor {

  @Input()
  public color: string = Color.PRIMARY;

  @Input()
  public size: string = Size.DEFAULT;

  @Input()
  public format: string = 'yyyy-MM-dd';

  public markedDates: MarkedDates = new MarkedDates();
  private pickerMarkedDates: MarkedDates = new MarkedDates();
  public doubleInputDates: SbDoubleInput<string> = new SbDoubleInput();

  private onChange: (dates: MarkedDates) => void = () => {};
  private onTouch: () => void = () => {};

  public handlePickerSelect(date: Date): void {
    if (this.pickerMarkedDates.isRangeDays || !this.pickerMarkedDates.start) {
      this.pickerMarkedDates = new MarkedDates();
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

    const markedDates = new MarkedDates();

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

  public writeValue(dates: MarkedDates): void {
    if (this.doUpdate(dates)) {
      dates.sort();
      this.markedDates = dates;
      this.updateInput();
    }
  }

  private doUpdate(dates: MarkedDates): boolean {
    if (dates && dates.start && dates.end) {
      const isStartDateValid = fns.isValid(dates.start);
      const isEndDateValid = fns.isValid(dates.end);
      if (isStartDateValid && isEndDateValid) {
        return true;
      }
    }
    return false;
  }

  public registerOnChange(fn: (dates: MarkedDates) => void): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  protected onBlur(): void { this.onTouch() }

}
