import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SbIconModule } from '../icon';

import { SbButtonModule } from './button';
import { SbDateInputModule } from './date-input';
import { SbInputModule } from './input';
import { SbNumberInputModule } from './number-input';
import { SbSelectModule } from './select';
import { SbToggleModule } from './toggle';

import { SbFileInputComponent } from './file-input';
import { SbIconButtonComponent } from './icon-button';
import { SbRadioComponent } from './radio';
import { SbSliderComponent } from './slider';
import { SbTimeInputComponent } from './time-input';

@NgModule({
  declarations: [
    SbIconButtonComponent,
    SbSliderComponent,
    SbFileInputComponent,
    SbRadioComponent,
    SbTimeInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbButtonModule,
    SbIconModule,
    SbNumberInputModule,
  ],
  exports: [
    // components
    SbFileInputComponent,
    SbIconButtonComponent,
    SbRadioComponent,
    SbSliderComponent,
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
