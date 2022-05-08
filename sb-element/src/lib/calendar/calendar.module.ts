import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';

import { SbIconModule } from "../icon";

import { SbCalendarDateComponent } from './date';
import { SbCalendarDatesComponent } from "./dates";
import { SbCalendarMonthComponent } from './month';
import { SbCalendarMonthsComponent } from './months';
import { SbCalendarsComponent } from './calendar';
import { SbCalendarYearComponent } from './year';
import { SbCalendarYearsComponent } from './years';

@NgModule({
  declarations: [
    SbCalendarDateComponent,
    SbCalendarDatesComponent,
    SbCalendarMonthComponent,
    SbCalendarMonthsComponent,
    SbCalendarsComponent,
    SbCalendarYearComponent,
    SbCalendarYearsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbIconModule,
  ],
  exports: [
    SbCalendarDateComponent,
    SbCalendarDatesComponent,
    SbCalendarMonthComponent,
    SbCalendarMonthsComponent,
    SbCalendarsComponent,
    SbCalendarYearComponent,
    SbCalendarYearsComponent,
  ]
})
export class SbCalendarModule { }
