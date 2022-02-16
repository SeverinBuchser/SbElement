import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules
import { CoreModule } from './core/core.module';
import { BarModule } from "./components/bar/bar.module";
import { FormModule } from './components/form/form.module';
import { IconModule } from './components/icon/icon.module';
import { PopperModule } from './components/popper/popper.module';

// Components
import { SbContainerComponent } from './components/container/container.component';
import { SbTableComponent } from './components/table/table.component';
import { SbCardComponent } from './components/card/card.component';
import { SbGridComponent } from './components/grid/grid.component';

// Directives
import { SbTimelineComponent } from './components/timeline/timeline.component';
import { SbLinkComponent } from './components/link/link.component';
import { SbBreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { NotificationModule } from "./components/notification/notification.module";


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
    CoreModule,
    BarModule,
    FormModule,
    IconModule,
    PopperModule,
    NotificationModule
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
    CoreModule,
    BarModule,
    FormModule,
    IconModule,
    PopperModule,
    NotificationModule
  ]
})
export class SbElementModule { }
