import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules
import { CoreModule } from './core/core.module';
import { FormModule } from './components/form/form.module';
import { IconModule } from './components/icon/icon.module';
import { NavigationModule } from './components/navigation/navigation.module';
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
  ],
  imports: [
    BrowserModule,
    CoreModule,
    FormModule,
    IconModule,
    NavigationModule,
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
    // Modules
    CoreModule,
    FormModule,
    IconModule,
    NavigationModule,
    PopperModule,
  ]
})
export class SbElementModule { }
