import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../../core';

import { PopperComponent } from './popper/popper.component';
import { TooltipComponent } from "./tooltip/tooltip.component";


@NgModule({
  declarations: [
    TooltipComponent,
    PopperComponent,
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    TooltipComponent,
    PopperComponent,
  ]
})
export class PopperModule { }
