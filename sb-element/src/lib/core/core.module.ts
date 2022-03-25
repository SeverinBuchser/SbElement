import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbAlignDirective } from './align';
import { SbCollapseDirective } from './collapse';
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
    SbHoverTriggerDirective,
    SbTriggerDirective,

    SbStyleModule,
    SbOverlayModule
  ]
})
export class SbCoreModule { }
