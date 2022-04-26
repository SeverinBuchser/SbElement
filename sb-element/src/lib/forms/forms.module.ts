import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SbCalendarModule } from "../calendar";
import { SbCoreModule } from '../core';
import { SbIconModule } from '../icon';
import { SbPopperModule } from "../popper";

import { SbButtonModule } from './button';
import { SbDateInputModule } from './date-input';
import { SbInputModule } from './input';
import { SbNumberInputModule } from './number-input';
import { SbToggleModule } from './toggle';

import { SbIconButtonComponent } from './icon-button';
import { SbRadioGroupComponent, SbRadioComponent } from './radio';
import { SbSliderComponent } from './slider';
import { SbFileInputComponent } from './file-input';
import { SbTimeInputComponent } from './time-input';
import { SbSelectModule } from './select/select.module';

@NgModule({
  declarations: [
    SbIconButtonComponent,
    SbRadioGroupComponent,
    SbRadioComponent,
    SbSliderComponent,
    SbFileInputComponent,
    SbTimeInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbButtonModule,
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
    SbIconButtonComponent,
    SbRadioGroupComponent,
    SbRadioComponent,
    SbSliderComponent,
    SbFileInputComponent,
    SbTimeInputComponent,

    // modules
    SbButtonModule,
    SbDateInputModule,
    SbInputModule,
    SbNumberInputModule,
    SbSelectModule,
    SbToggleModule
  ]
})
export class SbFormsModule { }
