import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbAlignModule } from './align';
import { SbCollapseDirective } from './collapse';
import { SbInsertDirective } from './insert';
import { SbOverlayModule } from './overlay';
import { SbThemingModule } from './theming';
import {
  SbClickOutsideTriggerDirective,
  SbClickTriggerDirective,
  SbHoverTriggerDirective,
  SbTriggerDirective
} from './trigger';

/**
 * @category NgModule
 */
@NgModule({
  declarations: [
    SbClickOutsideTriggerDirective,
    SbClickTriggerDirective,
    SbCollapseDirective,
    SbHoverTriggerDirective,
    SbInsertDirective,
    SbTriggerDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SbClickOutsideTriggerDirective,
    SbClickTriggerDirective,
    SbCollapseDirective,
    SbHoverTriggerDirective,
    SbInsertDirective,
    SbTriggerDirective,

    SbAlignModule,
    SbOverlayModule,
    SbThemingModule,
  ]
})
export class SbCoreModule { }
