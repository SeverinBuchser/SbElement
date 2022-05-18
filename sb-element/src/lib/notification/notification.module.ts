import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbCoreModule } from "../core";
import { SbIconModule } from "../icon";
import { SbIndicatorModule } from "../indicator";

import { SbAlertModule } from './alert';
import { SbToastModule } from './toast';

@NgModule({
  exports: [
    SbAlertModule,
    SbToastModule
  ]
})
export class SbNotificationModule { }
