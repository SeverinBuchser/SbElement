import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { CoreModule } from "../../core/core.module";
import { IconModule } from "../icon/icon.module";

import { SbCalendarMonthComponent } from "./month/calendar-month.component";
import { SbCalendarDateComponent } from './date/calendar-date.component';
import { SbCalendarNavigationComponent } from './navigation/calendar-navigation.component';
import { SbCalendarsComponent } from './calendar.component';

@NgModule({
  declarations: [
    SbCalendarsComponent,
    SbCalendarMonthComponent,
    SbCalendarDateComponent,
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
    SbCalendarMonthComponent,
    SbCalendarDateComponent,
    SbCalendarNavigationComponent,
  ]
})
export class SbCalendarModule { }
