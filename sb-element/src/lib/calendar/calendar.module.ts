import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { SbIconModule } from "../icon";

import { SbCalendarsComponent } from './calendar';
import { SbCalendarDateComponent } from './date';
import { SbCalendarDatesComponent } from "./dates";
import { SbCalendarMonthComponent } from './month';
import { SbCalendarMonthsComponent } from './months';
import { SbCalendarYearComponent } from './year';
import { SbCalendarYearsComponent } from './years';

@NgModule({
  declarations: [
    SbCalendarsComponent,
    SbCalendarDateComponent,
    SbCalendarMonthComponent,
    SbCalendarYearComponent,
    SbCalendarDatesComponent,
    SbCalendarMonthsComponent,
    SbCalendarYearsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbIconModule,
  ],
  exports: [
    SbCalendarsComponent,
    SbCalendarDateComponent,
    SbCalendarMonthComponent,
    SbCalendarYearComponent,
    SbCalendarDatesComponent,
    SbCalendarMonthsComponent,
    SbCalendarYearsComponent,
  ]
})
export class SbCalendarModule { }
