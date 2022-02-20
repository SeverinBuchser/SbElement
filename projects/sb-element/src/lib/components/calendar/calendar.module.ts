import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { SbIconModule } from "../icon/icon.module";

import { SbCalendarsComponent } from './calendar.component';
import { SbCalendarDateComponent } from './date/calendar-date.component';
import { SbCalendarDatesComponent } from "./dates/calendar-dates.component";
import { SbCalendarMonthComponent } from './month/calendar-month.component';
import { SbCalendarMonthsComponent } from './months/calendar-months.component';
import { SbCalendarYearComponent } from './year/calendar-year.component';
import { SbCalendarYearsComponent } from './years/calendar-years.component';

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
