import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PopperOutletMoveDirective } from "./outlet/popper-outlet-move.directive";
import { PopperOutletDirective } from "./outlet/popper-outlet.directive";
import { PopperOutletComponent } from "./outlet/popper-outlet.component";


import { PopoverTriggerClickDirective } from "./trigger/popover/click/popover-trigger-click.directive";
import { TooltipComponent } from "./trigger/popover/mouseover/tooltip/tooltip.component";
import { TooltipDirective } from "./trigger/popover/mouseover/tooltip/tooltip.directive";
import { PopoverTriggerMouseoverDirective } from './trigger/popover/mouseover/popover-trigger-mouseover.directive';
import { PopoverTriggerDirective } from './trigger/popover/popover-trigger.directive';

import { PopupTriggerClickDirective } from './trigger/popup/click/popup-trigger-click.directive';
import { PopupTriggerDirective } from './trigger/popup/popup-trigger.directive';
import { PopperTriggerDirective } from './trigger/popper-trigger.directive';


import { PopperDirective } from './popper.directive';


@NgModule({
  declarations: [
    PopperOutletMoveDirective,
    PopperOutletComponent,
    PopperOutletDirective,

    PopoverTriggerClickDirective,
    TooltipComponent,
    TooltipDirective,
    PopoverTriggerMouseoverDirective,
    PopoverTriggerDirective,
    PopupTriggerClickDirective,
    PopupTriggerDirective,
    PopperTriggerDirective,

    PopperDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PopperOutletComponent,
    PopperOutletDirective,

    PopoverTriggerClickDirective,
    TooltipComponent,
    TooltipDirective,
    PopoverTriggerMouseoverDirective,
    PopoverTriggerDirective,
    PopupTriggerClickDirective,
    PopupTriggerDirective,
    PopperTriggerDirective,

    PopperDirective,
  ]
})
export class PopperModule { }
