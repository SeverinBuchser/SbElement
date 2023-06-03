import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbIndicatorModule } from "../indicator";

import { SbToastComponent } from './toast.component';
import { SbToasterComponent } from './toaster.component';

/**
 * @category NgModule
 */
@NgModule({
  declarations: [
    SbToastComponent,
    SbToasterComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    SbIndicatorModule
  ],
  exports: [
    SbToastComponent,
    SbToasterComponent,
  ]
})
export class SbToastModule { }
