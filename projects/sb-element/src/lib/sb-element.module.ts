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
import { PopoverComponent } from './components/popover/popover.component';
import { PopoverOutletDirective } from './components/popover/popover-outlet.directive';
import { PopoverInletDirective } from './components/popover/popover-inlet.directive';


@NgModule({
  declarations: [
    // components
    ContainerComponent,
    AlertBoxComponent,
    TableComponent,
    AlertComponent,
    CardComponent,
    GridComponent,
    PopoverComponent,
    // directives
    PopoverInletDirective,
    PopoverOutletDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FormModule,
    BaseModule,
  ],
  exports: [
    // components
    ContainerComponent,
    AlertBoxComponent,
    TableComponent,
    AlertComponent,
    CardComponent,
    GridComponent,
    PopoverComponent,
    // modules
    FormModule,
    // directives
    PopoverInletDirective,
    PopoverOutletDirective,
    ThemeInputDirective
  ]
})
export class SbElementModule { }
