import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button/button.component';
import { DatePickerComponent } from './date/single/date-picker.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { RadioButtonGroupComponent } from './group/radio-button/radio-button-group.component';
import { CheckboxGroupComponent } from './group/checkbox/checkbox-group.component';
import { SelectionOptionsDirective } from './group/base/selection-options.directive';
import { SelectButtonComponent } from './select-button/select-button.component';
import { SliderComponent } from './slider/slider.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { IconComponent } from '../icon/icon.component';
import { FormGroupComponent } from './group/form-group.component';
import { InputComponent } from './input/input.component';
import { FileInputComponent } from './file-input/file-input.component';
import { PopperModule } from "../popper/popper.module";
import { CalendarMonthComponent } from "./date/calendar-month/calendar-month.component";
import { CalendarNavigationComponent } from './date/calendar-navigation/calendar-navigation.component';
import { DatePickerPopperComponent } from './date/picker/date-picker-popper.component';
import { DateRangePickerComponent } from './date/range/date-range-picker.component';
import { TimePickerComponent } from './time/time-picker.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    ButtonComponent,
    DatePickerComponent,
    DateRangePickerComponent,
    DatePickerPopperComponent,
    IconButtonComponent,
    ToggleSwitchComponent,
    CheckboxComponent,
    RadioButtonComponent,
    RadioButtonGroupComponent,
    CheckboxGroupComponent,
    SelectionOptionsDirective,
    SelectButtonComponent,
    SliderComponent,
    IconComponent,
    FormGroupComponent,
    InputComponent,
    FileInputComponent,
    CalendarMonthComponent,
    CalendarNavigationComponent,
    TimePickerComponent,
    SpinnerComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    PopperModule
  ],
  exports: [
    ButtonComponent,
    DatePickerComponent,
    DateRangePickerComponent,
    DatePickerPopperComponent,
    IconButtonComponent,
    ToggleSwitchComponent,
    CheckboxComponent,
    RadioButtonComponent,
    RadioButtonGroupComponent,
    CheckboxGroupComponent,
    SelectButtonComponent,
    SliderComponent,
    IconComponent,
    FormGroupComponent,
    InputComponent,
    FileInputComponent,
    CalendarMonthComponent,
    CalendarNavigationComponent,
    TimePickerComponent,
    SpinnerComponent,
  ]
})
export class FormModule { }
