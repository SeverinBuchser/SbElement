import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SbCalendarModule } from "../../calendar";
import { SbCoreModule } from '../../core';
import { SbIconModule } from '../../icon';
import { SbPopperModule } from "../../popper";

import { SbInputModule } from '../input';

import { SbDateInputComponent } from './date-input';
import { SbDateRangeInputComponent } from './date-range-input';

@NgModule({
  declarations: [SbDateInputComponent, SbDateRangeInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    SbCoreModule,
    SbCalendarModule,
    SbIconModule,
    SbInputModule,
    SbPopperModule
  ],
  exports: [SbDateInputComponent, SbDateRangeInputComponent]
})
export class SbDateInputModule { }
