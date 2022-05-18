import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SbIconModule } from '../icon';

import { SbButtonModule } from './button';
import { SbSelectModule } from './select';
import { SbToggleModule } from './toggle';

import { SbFileInputComponent } from './file-input';
import { SbRadioComponent } from './radio';
import { SbSliderComponent } from './slider';

@NgModule({
  declarations: [
    SbSliderComponent,
    SbFileInputComponent,
    SbRadioComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbButtonModule,
    SbIconModule
  ],
  exports: [
    // components
    SbFileInputComponent,
    SbRadioComponent,
    SbSliderComponent,
    // modules
    SbButtonModule,
    SbSelectModule,
    SbToggleModule
  ]
})
export class SbFormsModule { }
