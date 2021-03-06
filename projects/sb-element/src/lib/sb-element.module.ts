import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules
import { SbBarModule } from "./bar";
import { SbBreadcrumbsModule } from './breadcrumbs';
import { SbCalendarModule } from "./calendar";
import { SbCardModule } from './card';
import { SbContainerModule } from './container';
import { SbCoreModule } from './core';
import { SbFormsModule } from './forms';
import { SbGridModule } from './grid';
import { SbIconModule } from './icon';
import { SbIndicatorModule } from "./indicator";
import { SbLinkModule } from './link';
import { SbNotificationModule } from "./notification";
import { SbPopperModule } from './popper';
import { SbTableModule } from './table';
import { SbTimelineModule } from './timeline';

// Components

// Directives


@NgModule({
  declarations: [],
  imports: [
    BrowserModule
  ],
  exports: [
    SbBarModule,
    SbBreadcrumbsModule,
    SbCalendarModule,
    SbCardModule,
    SbContainerModule,
    SbCoreModule,
    SbFormsModule,
    SbGridModule,
    SbIconModule,
    SbIndicatorModule,
    SbLinkModule,
    SbNotificationModule,
    SbPopperModule,
    SbTableModule,
    SbTimelineModule,
  ]
})
export class SbElementModule { }
