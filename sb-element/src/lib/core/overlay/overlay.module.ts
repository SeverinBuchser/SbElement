import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';

import { SbOverlayComponent } from './overlay';
import { SbOverlayOutletComponent } from './overlay-outlet';
import { SbOverlayContainerComponent } from './overlay-container';

@NgModule({
  declarations: [SbOverlayComponent, SbOverlayOutletComponent, SbOverlayContainerComponent],
  imports: [CommonModule, PortalModule],
  exports: [SbOverlayComponent, SbOverlayOutletComponent, SbOverlayContainerComponent]
})
export class SbOverlayModule {}
