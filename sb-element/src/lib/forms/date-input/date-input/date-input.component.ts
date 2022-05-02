import { Component, Input } from '@angular/core';
import { Color, mixinDisable, mixinFocus, Size } from "../../../core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import * as fns from "date-fns";
import { MarkedDates } from "../../../calendar";

const SbDateInputCore = mixinDisable(mixinFocus(class {}));

@Component({
  selector: 'sb-input[type=date]',
  templateUrl: './date-input.component.html',
  inputs: [
    'disabled'
  ],
  outputs: [
    'focus',
    'blur'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbDateInputComponent,
    multi: true
  }]
})
export class SbDateInputComponent extends SbDateInputCore implements ControlValueAccessor {

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

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private _markedDates: MarkedDates | undefined;

  set markedDates(markedDates: MarkedDates) {
    this._markedDates = markedDates
  }
  get markedDates(): MarkedDates {
    if (this._markedDates) {
      return this._markedDates
    } else return new MarkedDates();
  }

  get dateFormatted(): string {
    if (this.markedDates.date) {
      return fns.format(this.markedDates.date, this.format);
    } else return '';
  }

  set dateFormatted(dateString: string) {
    let date = fns.parseISO(dateString);
    if (this.doUpdate(date)) {
      this.markedDates = new MarkedDates(date);
      this.onChange(date);
    }
  }

  public handlePickerSelect(date: Date): void {
    if (this.doUpdate(date)) {
      this.markedDates = new MarkedDates(date);
      this.onChange(date);
    }
  }

  public writeValue(date: Date): void {
    if (this.doUpdate(date)) {
      this.markedDates = new MarkedDates(date);
    }
  }

  private doUpdate(date: Date): boolean {
    if (!fns.isValid(date)) { return false }
    if (!this.markedDates.date) { return true }
    if (fns.isEqual(date, this.markedDates.date)) { return false }
    return true;
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  protected onBlur(): void { this.onTouch() }

}
