import { Component, ComponentRef, ViewChild } from '@angular/core';
import { PopoverTriggerClickDirective } from "../../../popper/trigger/popover/click";
import { PopperService } from "../../../../services/popper/popper.service";
import { DatePickerPopperComponent } from "./../picker/date-picker-popper.component";
import { ControlValueAccessorSizeThemeColorInputDirective } from "../../../../core/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive";
import { ThemeService } from "../../../../services/theme/theme.service";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import * as fns from "date-fns";

@Component({
  selector: 'sb-el-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useClass: DateRangePickerComponent,
    multi: true
  }]
})
export class DateRangePickerComponent extends ControlValueAccessorSizeThemeColorInputDirective<Array<string>> {

  @ViewChild(PopoverTriggerClickDirective)
  private trigger!: PopoverTriggerClickDirective
  private popper?: ComponentRef<DatePickerPopperComponent>;

  constructor(
    private popperService: PopperService,
    themeService: ThemeService
  ) {
    super(themeService);
  }

  open(): void {
    this.popper = this.popperService.pop(DatePickerPopperComponent, this.trigger);
    this.popper.instance.select.subscribe((dates: Array<string>) => this.handleSelect(dates));
    this.popper.instance.date = this.value;
    this.popper.instance.size = this.size;
    this.popper.instance.color = this.color;
    this.popper.instance.isRange = true;
  }

  public handleSelect(dates: Array<string>): void {
    const areValidDates = dates.map((date: string) => fns.parseISO(date))
      .reduce((valid: boolean, parsedDate: Date) => {
        return valid && fns.isValid(parsedDate)
      }, true);
    if (areValidDates) {
      this.writeValueInnerChange(dates);
      this.updateValues();
    }
  }

  protected updateValues(): void {
    if (this.popper) this.popper.instance.date = this.value;
  }

}
