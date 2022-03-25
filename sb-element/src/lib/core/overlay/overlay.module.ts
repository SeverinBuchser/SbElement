import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbOverlayComponent } from './overlay.component';

@NgModule({
  declarations: [SbOverlayComponent],
  imports: [
    CommonModule
  ],
  exports: [SbOverlayComponent]
})
export class SbOverlayModule {}
