import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { IconModule } from '../icon/icon.module';
import { InputModule } from './input/input.module';
import { SpinnerModule } from './spinner/spinner.module';

import { SbButtonComponent } from './button/button.component';
import { DatePickerComponent } from './date/single/date-picker.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';
import { SbCheckboxComponent } from './checkbox/checkbox.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { RadioButtonGroupComponent } from './radio-button/radio-button-group.component';
import { SelectButtonComponent } from './select-button/select-button.component';
import { SliderComponent } from './slider/slider.component';
import { FileInputComponent } from './file-input/file-input.component';
import { PopperModule } from "../popper/popper.module";
import { DateRangePickerComponent } from './date/range/date-range-picker.component';
import { TimePickerComponent } from './time/time-picker.component';
import { SbCalendarModule } from "../calendar/calendar.module";

@NgModule({
  declarations: [
    SbButtonComponent,
    DatePickerComponent,
    DateRangePickerComponent,
    IconButtonComponent,
    ToggleSwitchComponent,
    SbCheckboxComponent,
    RadioButtonComponent,
    RadioButtonGroupComponent,
    SelectButtonComponent,
    SliderComponent,
    FileInputComponent,
    TimePickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    IconModule,
    InputModule,
    SpinnerModule,
    PopperModule,
    SbCalendarModule
  ],
  exports: [
    // components
    SbButtonComponent,
    DatePickerComponent,
    DateRangePickerComponent,
    IconButtonComponent,
    ToggleSwitchComponent,
    SbCheckboxComponent,
    RadioButtonComponent,
    RadioButtonGroupComponent,
    SelectButtonComponent,
    SliderComponent,
    FileInputComponent,
    TimePickerComponent,

    // modules
    InputModule,
    SpinnerModule,
  ]
})
export class FormModule { }
