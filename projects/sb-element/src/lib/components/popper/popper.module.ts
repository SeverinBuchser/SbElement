import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../../core';


import { PopperOutletMoveDirective } from "./outlet/popper-outlet-move.directive";
import { PopperOutletDirective } from "./outlet/popper-outlet.directive";
import { PopperOutletComponent } from "./outlet/popper-outlet.component";


import { PopoverTriggerClickDirective } from "./trigger/popover/click/popover-trigger-click.directive";
import { TooltipComponent } from "./tooltip/tooltip.component";
import { PopoverTriggerDirective } from './trigger/popover/popover-trigger.directive';

import { PopupTriggerClickDirective } from './trigger/popup/click/popup-trigger-click.directive';
import { PopupTriggerDirective } from './trigger/popup/popup-trigger.directive';
import { PopperTriggerDirective } from './trigger/popper-trigger.directive';


import { PopperDirective } from './popper.directive';
import { PopperTestComponent } from './popper-test/popper-test.component';


@NgModule({
  declarations: [
    PopperOutletMoveDirective,
    PopperOutletComponent,
    PopperOutletDirective,

    PopoverTriggerClickDirective,
    TooltipComponent,
    PopoverTriggerDirective,
    PopupTriggerClickDirective,
    PopupTriggerDirective,
    PopperTriggerDirective,

    PopperDirective,
    PopperTestComponent,
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    PopperOutletComponent,
    PopperOutletDirective,

    PopoverTriggerClickDirective,
    TooltipComponent,
    PopoverTriggerDirective,
    PopupTriggerClickDirective,
    PopupTriggerDirective,
    PopperTriggerDirective,

    PopperDirective,
    PopperTestComponent,
  ]
})
export class PopperModule { }
