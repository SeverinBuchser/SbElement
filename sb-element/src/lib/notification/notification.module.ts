import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbCoreModule } from "../core";
import { SbIconModule } from "../icon";
import { SbIndicatorModule } from "../indicator";

import { SbToastComponent } from './toast';
import { SbToasterComponent } from './toaster';
import { PortalModule } from '@angular/cdk/portal';
import { SbAlertModule } from './alert';

@NgModule({
  declarations: [
    SbToastComponent,
    SbToasterComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    SbCoreModule,
    SbIconModule,
    SbIndicatorModule
  ],
  exports: [
    SbToastComponent,
    SbToasterComponent,
    SbAlertModule
  ]
})
export class SbNotificationModule { }
