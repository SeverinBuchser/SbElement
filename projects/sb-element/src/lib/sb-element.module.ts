import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { FormModule } from './components/form/form.module';

/**
 * Components
 */
import { ContainerComponent } from './components/container/container.component';
import { AlertBoxComponent } from './components/alert-box/alert-box.component';
import { TableComponent } from './components/table/table.component';
import { AlertComponent } from './components/alert/alert.component';
import { CardComponent } from './components/card/card.component';
import { GridComponent } from './components/grid/grid.component';

/**
 * Directives
 */
import { PopperDirective } from './components/popper/popper.directive';
import { ThemeInputDirective } from "./components/base/style-input/theme-input.directive";
import { PopperModule } from "./components/popper/popper.module";
import { GridDirective } from './components/grid/grid.directive';
import { TimelineComponent } from './components/timeline/timeline.component';


@NgModule({
  declarations: [
    // components
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
    PopperModule
  ],
  exports: [
    // components
    ContainerComponent,
    AlertBoxComponent,
    TableComponent,
    AlertComponent,
    CardComponent,
    GridComponent,
    // modules
    CoreModule,
    FormModule,
    PopperModule,
    TimelineComponent,
  ]
})
export class SbElementModule { }
