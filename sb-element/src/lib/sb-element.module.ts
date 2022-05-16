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
import { SbHighlightModule } from './highlight';
import { SbIconModule } from './icon';
import { SbIndicatorModule } from "./indicator";
import { SbLinkModule } from './link';
import { SbNotificationModule } from "./notification";
import { SbPaginatorModule } from "./paginator";
import { SbPopperModule } from './popper';
import { SbSidebarModule } from './sidebar/sidebar.module';
import { SbTableModule } from './table';
import { SbTabsModule } from './tabs';
import { SbTimelineModule } from './timeline';

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
    SbHighlightModule,
    SbIconModule,
    SbIndicatorModule,
    SbLinkModule,
    SbNotificationModule,
    SbPaginatorModule,
    SbPopperModule,
    SbSidebarModule,
    SbTableModule,
    SbTabsModule,
    SbTimelineModule
  ]
})
export class SbElementModule { }
