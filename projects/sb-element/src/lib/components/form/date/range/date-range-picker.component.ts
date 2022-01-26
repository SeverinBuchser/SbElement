import { Component } from '@angular/core';
import { ControlValueAccessorSizeThemeColorInputDirective } from "../../../../core/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive";
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

}
