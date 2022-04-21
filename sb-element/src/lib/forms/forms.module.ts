import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SbCalendarModule } from "../calendar";
import { SbCoreModule } from '../core';
import { SbIconModule } from '../icon';
import { SbPopperModule } from "../popper";

import { SbDateInputModule } from './date-input';
import { SbInputModule } from './input';
import { SbNumberInputModule } from './number-input';

import { SbButtonComponent } from './button';
import { SbIconButtonComponent } from './icon-button';
import { SbToggleSwitchComponent } from './toggle-switch';
import { SbCheckboxComponent } from './checkbox';
import { SbRadioGroupComponent, SbRadioComponent } from './radio';
import { SbSelectButtonComponent } from './select-button';
import { SbSliderComponent } from './slider';
import { SbFileInputComponent } from './file-input';
import { SbTimeInputComponent } from './time-input';

@NgModule({
  declarations: [
    SbButtonComponent,
    SbIconButtonComponent,
    SbToggleSwitchComponent,
    SbCheckboxComponent,
    SbRadioGroupComponent,
    SbRadioComponent,
    SbSelectButtonComponent,
    SbSliderComponent,
    SbFileInputComponent,
    SbTimeInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbCoreModule,
    SbDateInputModule,
    SbIconModule,
    SbInputModule,
    SbNumberInputModule,
    SbPopperModule,
    SbCalendarModule
  ],
  exports: [
    // components
    SbButtonComponent,
    SbIconButtonComponent,
    SbToggleSwitchComponent,
    SbCheckboxComponent,
    SbRadioGroupComponent,
    SbRadioComponent,
    SbSelectButtonComponent,
    SbSliderComponent,
    SbFileInputComponent,
    SbTimeInputComponent,

    // modules
    SbDateInputModule,
    SbInputModule,
    SbNumberInputModule,
  ]
})
export class SbFormsModule { }
