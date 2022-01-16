import { Component, ComponentRef, ViewChild } from '@angular/core';
import { PopoverTriggerClickDirective } from "../../../popper/trigger/popover/click";
import { PopperService } from "../../../../services/popper/popper.service";
import { DatePickerPopperComponent } from "./../picker/date-picker-popper.component";
import { ControlValueAccessorSizeThemeColorInputDirective } from "../../../../core/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive";
import { ThemeService } from "../../../../services/theme/theme.service";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import * as fns from "date-fns";

@Component({
  selector: 'sb-el-date-picker',
  templateUrl: './date-picker.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useClass: DatePickerComponent,
    multi: true
  }]
})
export class DatePickerComponent extends ControlValueAccessorSizeThemeColorInputDirective<string> {

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
    this.popper.instance.select.subscribe((date: string) => this.handleSelect(date));
    this.popper.instance.date = this.value;
    this.popper.instance.size = this.size;
    this.popper.instance.color = this.color;
  }

  public handleSelect(date: string): void {
    const parsedDate = fns.parseISO(date);
    const isValidDate = fns.isValid(parsedDate);
    if (isValidDate) {
      this.writeValueInnerChange(date);
      this.updateValues();
    }
  }

  protected updateValues(): void {
    if (this.popper) this.popper.instance.date = this.value;
  }

}
