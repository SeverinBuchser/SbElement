import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SbCalendarModule } from '../calendar';
import { SbCoreModule } from '../core';
import { SbIconModule } from '../icon';
import { SbPopperModule } from '../popper';

import { SbDateInputComponent, SbDateRangeInputComponent } from './date-input';
import { SbInputGroupComponent } from './input-group.component';
import { SbInputComponent } from './input.component';
import { SbTimeInputComponent } from './time-input';

@NgModule({
  declarations: [
    SbDateInputComponent,
    SbDateRangeInputComponent,
    SbInputComponent,
    SbInputGroupComponent,
    SbTimeInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbCalendarModule,
    SbCoreModule,
    SbIconModule,
    SbPopperModule
  ],
  exports: [
    SbDateInputComponent,
    SbDateRangeInputComponent,
    SbInputComponent,
    SbInputGroupComponent,
    SbTimeInputComponent
  ]
})
export class SbInputModule { }
