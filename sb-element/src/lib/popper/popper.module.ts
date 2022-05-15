import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbCoreModule } from '../core';

import { SbPopperComponent } from './popper';
import { SbPopperContentComponent } from './popper-content';
import { SbPopperOverlayComponent } from './popper-overlay';
import { SbTooltipComponent } from "./tooltip";

@NgModule({
  declarations: [
    SbPopperComponent,
    SbPopperContentComponent,
    SbPopperOverlayComponent,
    SbTooltipComponent
  ],
  imports: [CommonModule, OverlayModule, SbCoreModule],
  exports: [
    SbPopperComponent,
    SbPopperContentComponent,
    SbPopperOverlayComponent,
    SbTooltipComponent
  ]
})
export class SbPopperModule { }
