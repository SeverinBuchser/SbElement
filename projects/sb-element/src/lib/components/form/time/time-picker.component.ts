import { Component } from '@angular/core';
import { ControlValueAccessorSizeThemeColorInputDirective } from "../../../core/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'sb-input[type=time]',
  templateUrl: './time-picker.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useClass: TimePickerComponent,
    multi: true
  }]
})
export class TimePickerComponent extends ControlValueAccessorSizeThemeColorInputDirective<string> {

}
