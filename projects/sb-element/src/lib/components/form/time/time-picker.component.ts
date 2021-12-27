import { Component } from '@angular/core';
import { ControlValueAccessorSizeThemeColorInputDirective } from "../../base/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive";
import { ThemeService } from "../../../services/theme/theme.service";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'sb-el-time-picker',
  templateUrl: './time-picker.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useClass: TimePickerComponent,
    multi: true
  }]
})
export class TimePickerComponent extends ControlValueAccessorSizeThemeColorInputDirective<string> {


    constructor(
      themeService: ThemeService
    ) {
      super(themeService);
    }

  }
