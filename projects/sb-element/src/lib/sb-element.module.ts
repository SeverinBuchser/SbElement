import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules
import { SbCoreModule } from './core/core.module';
import { SbBarModule } from "./components/bar/bar.module";
import { SbFormModule } from './components/form/form.module';
import { SbIconModule } from './components/icon/icon.module';
import { SbPopperModule } from './components/popper/popper.module';
import { SbNotificationModule } from "./components/notification/notification.module";
import { SbCalendarModule } from "./components/calendar/calendar.module";

// Components
import { SbContainerComponent } from './components/container/container.component';
import { SbTableComponent } from './components/table/table.component';
import { SbCardComponent } from './components/card/card.component';
import { SbGridComponent } from './components/grid/grid.component';

// Directives
import { SbTimelineComponent } from './components/timeline/timeline.component';
import { SbLinkComponent } from './components/link/link.component';
import { SbBreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SbIndicatorModule } from "./components/indicator";


@NgModule({
  declarations: [
    // Components
    SbContainerComponent,
    SbTableComponent,
    SbCardComponent,
    SbGridComponent,
    SbTimelineComponent,
    SbLinkComponent,
    SbBreadcrumbsComponent,
  ],
  imports: [
    BrowserModule,
    SbCoreModule,
    SbBarModule,
    SbFormModule,
    SbIconModule,
    SbPopperModule,
    SbNotificationModule,
    SbCalendarModule,
    SbIndicatorModule,
  ],
  exports: [
    // Components
    SbContainerComponent,
    SbTableComponent,
    SbCardComponent,
    SbGridComponent,
    SbTimelineComponent,
    SbLinkComponent,
    SbBreadcrumbsComponent,
    // Modules
    SbCoreModule,
    SbBarModule,
    SbFormModule,
    SbIconModule,
    SbPopperModule,
    SbNotificationModule,
    SbCalendarModule,
    SbIndicatorModule,
  ]
})
export class SbElementModule { }
