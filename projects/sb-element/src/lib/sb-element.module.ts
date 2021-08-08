import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BaseModule } from './components/base/base.module';
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
import { ThemeInputDirective } from "./components/base/style-input/theme-input.directive";
import { PopoverOutletComponent } from './components/popover/popover-outlet/popover-outlet.component';
import { PopoverOutletDirective } from './components/popover/popover-outlet.directive';


@NgModule({
  declarations: [
    ContainerComponent,
    AlertBoxComponent,
    TableComponent,
    AlertComponent,
    CardComponent,
    GridComponent,
    PopoverOutletComponent,
    PopoverOutletDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FormModule,
    BaseModule,
  ],
  exports: [
    ContainerComponent,
    AlertBoxComponent,
    TableComponent,
    AlertComponent,
    CardComponent,
    GridComponent,
    PopoverOutletComponent,
    // modules
    FormModule,
    // directives
    ThemeInputDirective
  ]
})
export class SbElementModule { }
