import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';

import { SbIconModule } from "../icon";

import { SbCalendarComponent } from './calendar';
import { SbCalendarDatesComponent } from "./calendar-dates";
import { SbCalendarPeriodComponent } from './calendar-period';
import { SbMarkableDateComponent } from './markable-date';

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
    SbIconModule,
  ],
  exports: [
    SbCalendarComponent,
    SbCalendarDatesComponent,
    SbCalendarPeriodComponent,
    SbMarkableDateComponent,
  ]
})
export class SbCalendarModule { }
