import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbOverlayComponent } from './overlay';
import { SbOverlayOutletComponent } from './overlay-outlet';

@NgModule({
  declarations: [SbOverlayComponent, SbOverlayOutletComponent],
  imports: [CommonModule],
  exports: [SbOverlayComponent, SbOverlayOutletComponent]
})
export class SbOverlayModule {}
