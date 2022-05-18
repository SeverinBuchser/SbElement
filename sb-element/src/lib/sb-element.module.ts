import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules
import { SbBreadcrumbsModule } from './breadcrumbs';
import { SbCalendarModule } from "./calendar";
import { SbCardModule } from './card';
import { SbContainerModule } from './container';
import { SbCoreModule } from './core';
import { SbFormsModule } from './forms';
import { SbGridModule } from './grid';
import { SbHighlightModule } from './highlight';
import { SbButtonModule } from './button';
import { SbIconModule } from './icon';
import { SbIndicatorModule } from "./indicator";
import { SbInputModule } from './input/input.module';
import { SbLinkModule } from './link';
import { SbNavBarModule } from "./nav-bar";
import { SbAlertModule } from "./alert";
import { SbToastModule } from "./toast";
import { SbPaginatorModule } from "./paginator";
import { SbPopperModule } from './popper';
import { SbSidebarModule } from './sidebar/sidebar.module';
import { SbTableModule } from './table';
import { SbTabsModule } from './tabs';
import { SbTimelineModule } from './timeline';
import { SbToggleModule } from './toggle';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule
  ],
  exports: [
    SbAlertModule,
    SbToastModule,
    SbBreadcrumbsModule,
    SbCalendarModule,
    SbCardModule,
    SbContainerModule,
    SbCoreModule,
    SbFormsModule,
    SbGridModule,
    SbHighlightModule,
    SbButtonModule,
    SbIconModule,
    SbIndicatorModule,
    SbInputModule,
    SbLinkModule,
    SbNavBarModule,
    SbPaginatorModule,
    SbPopperModule,
    SbSidebarModule,
    SbTableModule,
    SbTabsModule,
    SbTimelineModule,
    SbToggleModule
  ]
})
export class SbElementModule { }
