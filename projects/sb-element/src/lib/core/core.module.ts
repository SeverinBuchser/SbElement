import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SbTriggerDirective } from './trigger/trigger.directive';
import { SbClickTriggerDirective } from './trigger/click-trigger.directive';
import { SbAlignDirective } from './align/align.directive';
import { SbHoverTriggerDirective } from './trigger/hover-trigger.directive';
import { SbClickOutsideTriggerDirective } from './trigger/click-outside-trigger.directive';
import { SbStyleModule } from './style';



@NgModule({
  declarations: [
    SbTriggerDirective,
    SbClickOutsideTriggerDirective,
    SbClickTriggerDirective,
    SbHoverTriggerDirective,
    SbAlignDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [

    SbTriggerDirective,
    SbClickOutsideTriggerDirective,
    SbClickTriggerDirective,
    SbHoverTriggerDirective,
    SbAlignDirective,

    SbStyleModule
  ]
})
export class SbCoreModule { }
