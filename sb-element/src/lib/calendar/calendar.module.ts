import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { SbIconModule } from "../icon";

import { SbIconButtonModule } from '../icon-button';
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
    SbIconButtonModule,
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
