import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';

import { SbOverlayComponent } from './overlay';
import { SbOverlayContainerComponent } from './overlay-container';
import { SbSlidableOverlayContainerComponent } from './slidable-overlay-container';

@NgModule({
  declarations: [
    SbOverlayComponent, 
    SbOverlayContainerComponent, 
    SbSlidableOverlayContainerComponent
  ],
  imports: [CommonModule, PortalModule],
  exports: [
    SbOverlayComponent, 
    SbOverlayContainerComponent,
    SbSlidableOverlayContainerComponent
  ]
})
export class SbOverlayModule { }
