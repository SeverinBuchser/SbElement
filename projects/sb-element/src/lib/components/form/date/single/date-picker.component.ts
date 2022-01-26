import { Component } from '@angular/core';
import { ControlValueAccessorSizeThemeColorInputDirective } from "../../../../core/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import * as fns from "date-fns";

@Component({
  selector: 'sb-date-picker',
  templateUrl: './date-picker.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useClass: DatePickerComponent,
    multi: true
  }]
})
export class DatePickerComponent extends ControlValueAccessorSizeThemeColorInputDirective<string> {

  public handlePickerSelect(dates: Array<string>): void {
    if (dates.length == 1) {
      this.handleSelect(dates[0])
    }
  }

  public handleSelect(date: string): void {
    const parsedDate = fns.parseISO(date);
    const isValidDate = fns.isValid(parsedDate);
    if (isValidDate) {
      this.writeValueInnerChange(date);
      this.updateValues();
    }
  }

}
