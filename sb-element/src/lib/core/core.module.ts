import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbAlignDirective } from './align';
import { SbCollapseDirective } from './collapse';
import { SbInsertDirective } from './insert';
import { SbStyleModule } from './style';
import {
  SbClickOutsideTriggerDirective,
  SbClickTriggerDirective,
  SbHoverTriggerDirective,
  SbTriggerDirective } from './trigger';
import { SbOverlayModule } from './overlay';

@NgModule({
  declarations: [
    SbAlignDirective,
    SbClickOutsideTriggerDirective,
    SbClickTriggerDirective,
    SbCollapseDirective,
    SbInsertDirective,
    SbHoverTriggerDirective,
    SbTriggerDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SbAlignDirective,
    SbClickOutsideTriggerDirective,
    SbClickTriggerDirective,
    SbCollapseDirective,
    SbInsertDirective,
    SbHoverTriggerDirective,
    SbTriggerDirective,

    SbStyleModule,
    SbOverlayModule
  ]
})
export class SbCoreModule { }
