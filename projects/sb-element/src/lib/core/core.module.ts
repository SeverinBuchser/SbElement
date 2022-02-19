import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriggerDirective } from './trigger/trigger.directive';
import { ClickTriggerDirective } from './trigger/click-trigger.directive';
import { AlignDirective } from './align/align.directive';
import { HoverTriggerDirective } from './trigger/hover-trigger.directive';
import { ClickOutsideTriggerDirective } from './trigger/click-outside-trigger.directive';
import { StyleModule } from './style';



@NgModule({
  declarations: [
    TriggerDirective,
    ClickOutsideTriggerDirective,
    ClickTriggerDirective,
    HoverTriggerDirective,
    AlignDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [

    TriggerDirective,
    ClickOutsideTriggerDirective,
    ClickTriggerDirective,
    HoverTriggerDirective,
    AlignDirective,

    StyleModule
  ]
})
export class CoreModule { }
