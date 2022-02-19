import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { CoreModule } from "../../core/core.module";
import { IconModule } from "../icon/icon.module";

import { SbCalendarMonthComponent } from "./calendar-month/calendar-month.component";
import { SbCalendarDateComponent } from './calendar-date/calendar-date.component';
import { CalendarNavigationComponent } from './calendar-navigation/calendar-navigation.component';
import { SbCalendarsComponent } from './calendar.component';

@NgModule({
  declarations: [
    SbCalendarsComponent,
    SbCalendarMonthComponent,
    SbCalendarDateComponent,
    CalendarNavigationComponent,
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
    SbCalendarMonthComponent,
    SbCalendarDateComponent,
    CalendarNavigationComponent,
  ]
})
export class SbCalendarModule { }
