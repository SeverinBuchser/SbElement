import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SbCalendarModule } from '../calendar';
import { SbCoreModule } from '../core';
import { SbIconModule } from '../icon';
import { SbPopperModule } from '../popper';

import { SbDateInputComponent, SbDateRangeInputComponent } from './date-input';
import { SbInputComponent } from './input';
import { SbInputGroupComponent } from './input-group';
import { SbTimeInputComponent } from './time-input';

@NgModule({
  declarations: [
    SbInputComponent,
    SbInputGroupComponent,
    SbDateInputComponent,
    SbDateRangeInputComponent,
    SbTimeInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbIconModule,
    SbPopperModule,
    SbCoreModule,
    SbCalendarModule
  ],
  exports: [
    SbInputComponent,
    SbInputGroupComponent,
    SbDateInputComponent,
    SbDateRangeInputComponent,
    SbTimeInputComponent
  ]
})
export class SbInputModule { }
