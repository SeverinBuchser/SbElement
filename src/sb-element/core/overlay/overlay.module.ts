import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbOverlayContainerComponent } from './overlay-container.component';
import { SbOverlayComponent } from './overlay.component';
import { 
  SbSlidableOverlayContainerComponent 
} from './slidable-overlay-container.component';

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
