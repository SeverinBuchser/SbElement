import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopperDirective } from "../../popper/popper.directive";

@Component({
  selector: 'sb-el-date-picker-popper',
  templateUrl: './date-picker-popper.component.html'
})
export class DatePickerPopperComponent extends PopperDirective {

  @Output()
  public select: EventEmitter<string> = new EventEmitter<string>();
  public handleSelect(): void {this.select.emit("2021-12-09")}

  @Input()
  public date: string | undefined = '';

  constructor() {
    super();
  }

}
