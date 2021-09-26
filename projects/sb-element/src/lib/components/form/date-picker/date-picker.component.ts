import { Component, ComponentRef, ViewChild } from '@angular/core';
import { PopoverTriggerClickDirective } from "../../popper/trigger/popover/click";
import { PopperService } from "../../../services/popper/popper.service";
import { DatePickerPopperComponent } from "./date-picker-popper.component";
import { ControlValueAccessorSizeThemeColorInputDirective } from "../../base/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive";
import { ThemeService } from "../../../services/theme/theme.service";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { isValid, parseISO } from "date-fns";

@Component({
  selector: 'sb-el-date-picker',
  templateUrl: './date-picker.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DatePickerComponent,
    multi: true
  }]
})
export class DatePickerComponent extends ControlValueAccessorSizeThemeColorInputDirective<string> {

  @ViewChild(PopoverTriggerClickDirective)
  private trigger!: PopoverTriggerClickDirective

  private popper?: ComponentRef<DatePickerPopperComponent>;

  constructor(
    private poppverService: PopperService,
    themeService: ThemeService
  ) {
    super(themeService);
  }

  open(): void {
    this.popper = this.poppverService.pop(DatePickerPopperComponent, this.trigger);
    this.popper.instance.select.subscribe((date: string) => this.handleSelect(date));
    this.popper.instance.date = this.value;
  }

  public handleSelect(date: string): void {
    const parsedDate = parseISO(date);
    const isValidDate = isValid(parsedDate);
    if (isValidDate) this.writeValue(date);
  }

  protected updateValues(): void {
    if (this.popper) this.popper.instance.date = this.value;
  }

}
