import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { SbCalendarModule } from "../calendar";
import { SbCoreModule } from '../core';
import { SbIconModule } from '../icon';
import { SbPopperModule } from "../popper";
import { SbInputModule } from './input/input.module';
import { SbSpinnerModule } from './spinner/spinner.module';

import { SbButtonComponent } from './button';
import { SbDatePickerComponent, SbDateRangePickerComponent } from './date';
import { SbIconButtonComponent } from './icon-button';
import { SbToggleSwitchComponent } from './toggle-switch';
import { SbCheckboxComponent } from './checkbox';
import { SbRadioButtonComponent, SbRadioButtonGroupComponent } from './radio-button';
import { SbSelectButtonComponent } from './select-button';
import { SbSliderComponent } from './slider';
import { SbFileInputComponent } from './file-input';
import { SbTimePickerComponent } from './time';

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
export class SbFormsModule { }
