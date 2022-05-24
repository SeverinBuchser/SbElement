import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbButtonModule } from '../../button';
import { SbCoreModule } from '../../core';
import { SbIconModule } from '../../icon';

import { SbSelectButtonListComponent } from './select-button-list.component';
import { SbSelectButtonComponent } from './select-button.component';

/**
 * @category NgModule
 */
@NgModule({
  declarations: [
    SbSelectButtonComponent,
    SbSelectButtonListComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
    SbButtonModule,
    SbCoreModule,
    SbIconModule
  ],
  exports: [
    SbSelectButtonComponent
  ]
})
export class SbSelectButtonModule { }
