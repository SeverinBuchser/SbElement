import { Component } from '@angular/core';
import { PopperDirective } from "../../popper/popper.directive";

@Component({
  selector: 'sb-el-date-picker-popper',
  templateUrl: './date-picker-popper.component.html'
})
export class DatePickerPopperComponent extends PopperDirective {

  constructor() {
    super();
  }

}
