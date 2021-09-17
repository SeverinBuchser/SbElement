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
import { TooltipComponent } from './components/popover/inlet/tooltip/tooltip.component';
import { AlertComponent } from './components/alert/alert.component';
import { CardComponent } from './components/card/card.component';
import { GridComponent } from './components/grid/grid.component';
import { PopperOutletComponent } from './components/popover/outlet/popper-outlet.component';

/**
 * Directives
 */
import { PopoverDirective } from './components/popover/popover.directive';
import { PopperOutletDirective } from './components/popover/outlet/popper-outlet.directive';
import { PopperTriggerDirective } from './components/popover/inlet/popper-trigger.directive';
import { ThemeInputDirective } from "./components/base/style-input/theme-input.directive";
import { TooltipDirective } from './components/popover/inlet/tooltip/tooltip.directive';


@NgModule({
  declarations: [
    // components
    ContainerComponent,
    AlertBoxComponent,
    TableComponent,
    TooltipComponent,
    AlertComponent,
    CardComponent,
    GridComponent,
    PopperOutletComponent,
    // directives
    PopoverDirective,
    PopperOutletDirective,
    PopperTriggerDirective,
    TooltipDirective,
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
    TooltipComponent,
    AlertComponent,
    CardComponent,
    GridComponent,
    PopperOutletComponent,
    // modules
    FormModule,
    // directives
    PopoverDirective,
    PopperOutletDirective,
    PopperTriggerDirective,
    ThemeInputDirective,
    TooltipDirective,
  ]
})
export class SbElementModule { }
