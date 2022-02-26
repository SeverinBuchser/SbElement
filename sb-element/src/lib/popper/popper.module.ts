import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbCoreModule } from '../core';

import { SbPopperComponent } from './popper/popper.component';
import { SbTooltipComponent } from "./tooltip/tooltip.component";

@NgModule({
  declarations: [SbPopperComponent, SbTooltipComponent],
  imports: [CommonModule, SbCoreModule],
  exports: [SbPopperComponent, SbTooltipComponent]
})
export class SbPopperModule { }
