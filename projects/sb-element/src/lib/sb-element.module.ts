import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules
import { CoreModule } from './core/core.module';
import { BarModule } from "./components/bar/bar.module";
import { FormModule } from './components/form/form.module';
import { IconModule } from './components/icon/icon.module';
import { PopperModule } from './components/popper/popper.module';

// Components
import { ContainerComponent } from './components/container/container.component';
import { AlertBoxComponent } from './components/alert-box/alert-box.component';
import { TableComponent } from './components/table/table.component';
import { AlertComponent } from './components/alert/alert.component';
import { CardComponent } from './components/card/card.component';
import { GridComponent } from './components/grid/grid.component';

// Directives
import { GridDirective } from './components/grid/grid.directive';
import { TimelineComponent } from './components/timeline/timeline.component';
import { LinkComponent } from './components/link/link.component';
import { TestComponent } from './components/test/test.component';


@NgModule({
  declarations: [
    // Components
    ContainerComponent,
    AlertBoxComponent,
    TableComponent,
    AlertComponent,
    CardComponent,
    GridComponent,
    GridDirective,
    TimelineComponent,
    LinkComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BarModule,
    FormModule,
    IconModule,
    PopperModule
  ],
  exports: [
    // Components
    ContainerComponent,
    AlertBoxComponent,
    TableComponent,
    AlertComponent,
    CardComponent,
    GridComponent,
    TimelineComponent,
    LinkComponent,
    TestComponent,
    // Modules
    CoreModule,
    BarModule,
    FormModule,
    IconModule,
    PopperModule,
  ]
})
export class SbElementModule { }
