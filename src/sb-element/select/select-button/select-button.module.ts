import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbButtonModule } from '../../button';
import { SbCoreModule } from '../../core';
import { SbIconModule } from '../../icon';

import { SbSelectButtonComponent } from './select-button';
import { SbSelectButtonListComponent } from './select-button-list';

@NgModule({
  declarations: [
    SbSelectButtonComponent,
    SbSelectButtonListComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    SbButtonModule,
    SbCoreModule,
    SbIconModule
  ],
  exports: [
    SbSelectButtonComponent
  ]
})
export class SbSelectButtonModule { }
