import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SbCoreModule } from "../../core";
import { SbIconModule } from "../icon";
import { SbIndicatorModule } from "../indicator";

import { SbAlertBoxComponent } from './alert-box';
import { SbAlertComponent } from './alert';
import { SbToastComponent } from './toast';
import { SbToasterComponent } from './toaster';

@NgModule({
  declarations: [SbAlertBoxComponent, SbAlertComponent, SbToastComponent, SbToasterComponent],
  imports: [CommonModule, SbCoreModule, SbIconModule, SbIndicatorModule],
  exports: [SbAlertBoxComponent, SbAlertComponent, SbToastComponent, SbToasterComponent]
})
export class SbNotificationModule { }
