import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SbButtonModule } from '../button';
import { SbIconModule } from '../icon';

import { SbCalendarDatesComponent } from './calendar-dates.component';
import { SbCalendarPeriodComponent } from './calendar-period.component';
import { SbCalendarComponent } from './calendar.component';
import { SbMarkableDateComponent } from './markable-date.component';

/**
 * @category NgModule
 */
@NgModule({
  declarations: [
    SbCalendarComponent,
    SbCalendarDatesComponent,
    SbCalendarPeriodComponent,
    SbMarkableDateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbButtonModule,
    SbIconModule
  ],
  exports: [
    SbCalendarComponent,
    SbCalendarDatesComponent,
    SbCalendarPeriodComponent,
    SbMarkableDateComponent,
  ]
})
export class SbCalendarModule { }
