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
import { TooltipComponent } from './components/popper/trigger/popover/mouseover/tooltip/tooltip.component';
import { AlertComponent } from './components/alert/alert.component';
import { CardComponent } from './components/card/card.component';
import { GridComponent } from './components/grid/grid.component';
import { PopperOutletComponent } from './components/popper/outlet/popper-outlet.component';

/**
 * Directives
 */
import { PopoverTriggerDirective } from './components/popper/trigger/popover/popover-trigger.directive';
import { PopperDirective } from './components/popper/popper.directive';
import { PopperOutletDirective } from './components/popper/outlet/popper-outlet.directive';
import { PopperTriggerDirective } from './components/popper/trigger/popper-trigger.directive';
import { PopoverTriggerMouseoverDirective } from './components/popper/trigger/popover/mouseover/popover-trigger-mouseover.directive';
import { PopupTriggerDirective } from './components/popper/trigger/popup/popup-trigger.directive';
import { ThemeInputDirective } from "./components/base/style-input/theme-input.directive";
import { TooltipDirective } from './components/popper/trigger/popover/mouseover/tooltip/tooltip.directive';
import { PopupTriggerClickDirective } from './components/popper/trigger/popup/click/popup-trigger-click.directive';
import { PopoverTriggerClickDirective } from './components/popper/trigger/popover/click/popover-trigger-click.directive';
import { PopperOutletMoveDirective } from './components/popper/outlet/popper-outlet-move.directive';


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
    PopoverTriggerDirective,
    PopoverTriggerClickDirective,
    PopoverTriggerMouseoverDirective,
    PopperDirective,
    PopperOutletDirective,
    PopperTriggerDirective,
    PopupTriggerDirective,
    PopupTriggerClickDirective,
    TooltipDirective,
    PopperOutletMoveDirective,
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
    PopoverTriggerDirective,
    PopoverTriggerClickDirective,
    PopoverTriggerMouseoverDirective,
    PopperDirective,
    PopperOutletDirective,
    PopperTriggerDirective,
    PopupTriggerDirective,
    PopupTriggerClickDirective,
    ThemeInputDirective,
    TooltipDirective,
  ]
})
export class SbElementModule { }
