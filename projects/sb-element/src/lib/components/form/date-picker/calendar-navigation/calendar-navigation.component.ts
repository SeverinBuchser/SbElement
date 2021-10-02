import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import * as fns from "date-fns";
import { ControlValueAccessorSizeThemeColorInputDirective } from "../../../base/control-value-accessor-style-input";

@Component({
  selector: 'sb-el-calendar-navigation',
  templateUrl: './calendar-navigation.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CalendarNavigationComponent,
    multi: true
  }]
})
export class CalendarNavigationComponent extends ControlValueAccessorSizeThemeColorInputDirective<Date> {

  public rootClass: string = 'sb-el-calendar-navigation';

  get format(): string {
    if (this.value) return fns.format(this.value, 'MMM. yyyy');
    else return '';
  }

  public previousYear(): void {
    if (this.value) this.writeValueInnerChange(fns.subYears(this.value, 1));
  }

  public nextYear(): void {
    if (this.value) this.writeValueInnerChange(fns.addYears(this.value, 1));
  }

  public previousMonth(): void {
    if (this.value) this.writeValueInnerChange(fns.subMonths(this.value, 1));
  }

  public nextMonth(): void {
    if (this.value) this.writeValueInnerChange(fns.addMonths(this.value, 1));
  }

}
