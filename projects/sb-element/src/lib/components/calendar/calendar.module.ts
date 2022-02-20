import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { CoreModule } from "../../core/core.module";
import { IconModule } from "../icon/icon.module";

import { SbCalendarMonthsComponent } from './months/calendar-months.component';
import { SbCalendarDatesComponent } from "./dates/calendar-dates.component";
import { SbCalendarDateComponent } from './date/calendar-date.component';
import { SbCalendarNavigationComponent } from './navigation/calendar-navigation.component';
import { SbCalendarsComponent } from './calendar.component';
import { SbCalendarMonthComponent } from './month/calendar-month.component';

@NgModule({
  declarations: [
    SbCalendarsComponent,
    SbCalendarDateComponent,
    SbCalendarMonthComponent,
    SbCalendarMonthsComponent,
    SbCalendarDatesComponent,
    SbCalendarNavigationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    IconModule,
  ],
  exports: [
    // components
    SbCalendarsComponent,
    SbCalendarDateComponent,
    SbCalendarMonthComponent,
    SbCalendarMonthsComponent,
    SbCalendarDatesComponent,
    SbCalendarNavigationComponent,
  ]
})
export class SbCalendarModule { }
