import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbCalendarModule, SbCardModule, SbGridModule } from 'sb-element';

import { DocCoreModule } from '../doc-core';

import { CalendarApiDocComponent } from './api-doc';
import { CalendarDocComponent } from './calendar-doc';
import { CalendarExampleComponent } from './example';

@NgModule({
  declarations: [
    CalendarApiDocComponent,
    CalendarDocComponent,
    CalendarExampleComponent
  ],
  imports: [
    CommonModule,
    DocCoreModule,
    SbCalendarModule,
    SbCardModule,
    SbGridModule
  ],
  exports: [
    CalendarDocComponent
  ]
})
export class CalendarDocModule { }
