import { Component, ViewChild } from '@angular/core';
import { PopoverTriggerClickDirective } from "../../popper/trigger/popover/click";
import { PopperService } from "../../../services/popper/popper.service";
import { DatePickerPopperComponent } from "./date-picker-popper.component";

@Component({
  selector: 'sb-el-date-picker',
  templateUrl: './date-picker.component.html'
})
export class DatePickerComponent {

  @ViewChild(PopoverTriggerClickDirective)
  private trigger!: PopoverTriggerClickDirective

  constructor(private poppverService: PopperService) { }

  open(): void {
    this.poppverService.pop(DatePickerPopperComponent, this.trigger);
  }

}
