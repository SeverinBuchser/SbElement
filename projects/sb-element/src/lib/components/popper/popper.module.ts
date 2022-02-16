import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../../core';

import { SbPopperComponent } from './popper/popper.component';
import { SbTooltipComponent } from "./tooltip/tooltip.component";


@NgModule({
  declarations: [SbPopperComponent, SbTooltipComponent],
  imports: [CommonModule, CoreModule],
  exports: [SbPopperComponent, SbTooltipComponent]
})
export class PopperModule { }
