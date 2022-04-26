import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbAlignModule } from './align';
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
    SbClickOutsideTriggerDirective,
    SbClickTriggerDirective,
    SbCollapseDirective,
    SbInsertDirective,
    SbHoverTriggerDirective,
    SbTriggerDirective,

    SbAlignModule,
    SbStyleModule,
    SbOverlayModule
  ]
})
export class SbCoreModule { }
