import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbCoreModule } from '../core';

import { SbPopperContentComponent } from './popper-content.component';
import { SbPopperOverlayComponent } from './popper-overlay.component';
import { SbPopperComponent } from './popper.component';
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
