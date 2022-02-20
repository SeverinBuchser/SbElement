import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { SbCoreModule } from '../../core/core.module';
import { SbIconModule } from '../icon/icon.module';
import { SbInputModule } from './input/input.module';
import { SbSpinnerModule } from './spinner/spinner.module';

import { SbButtonComponent } from './button/button.component';
import { SbDatePickerComponent } from './date/single/date-picker.component';
import { SbIconButtonComponent } from './icon-button/icon-button.component';
import { SbToggleSwitchComponent } from './toggle-switch/toggle-switch.component';
import { SbCheckboxComponent } from './checkbox/checkbox.component';
import { SbRadioButtonComponent } from './radio-button/radio-button.component';
import { SbRadioButtonGroupComponent } from './radio-button/radio-button-group.component';
import { SbSelectButtonComponent } from './select-button/select-button.component';
import { SbSliderComponent } from './slider/slider.component';
import { SbFileInputComponent } from './file-input/file-input.component';
import { SbPopperModule } from "../popper/popper.module";
import { SbDateRangePickerComponent } from './date/range/date-range-picker.component';
import { SbTimePickerComponent } from './time/time-picker.component';
import { SbCalendarModule } from "../calendar/calendar.module";

@NgModule({
  declarations: [
    SbButtonComponent,
    SbDatePickerComponent,
    SbDateRangePickerComponent,
    SbIconButtonComponent,
    SbToggleSwitchComponent,
    SbCheckboxComponent,
    SbRadioButtonComponent,
    SbRadioButtonGroupComponent,
    SbSelectButtonComponent,
    SbSliderComponent,
    SbFileInputComponent,
    SbTimePickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbCoreModule,
    SbIconModule,
    SbInputModule,
    SbSpinnerModule,
    SbPopperModule,
    SbCalendarModule
  ],
  exports: [
    // components
    SbButtonComponent,
    SbDatePickerComponent,
    SbDateRangePickerComponent,
    SbIconButtonComponent,
    SbToggleSwitchComponent,
    SbCheckboxComponent,
    SbRadioButtonComponent,
    SbRadioButtonGroupComponent,
    SbSelectButtonComponent,
    SbSliderComponent,
    SbFileInputComponent,
    SbTimePickerComponent,

    // modules
    SbInputModule,
    SbSpinnerModule,
  ]
})
export class SbFormModule { }
