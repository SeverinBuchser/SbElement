import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SbCoreModule } from "../../core";
import { SbIconModule } from "../icon";

import { SbAlertBoxComponent } from './alert-box';
import { SbAlertComponent } from './alert';
import { SbToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [SbAlertBoxComponent, SbAlertComponent, SbToastComponent],
  imports: [CommonModule, SbCoreModule, SbIconModule],
  exports: [SbAlertBoxComponent, SbAlertComponent, SbToastComponent]
})
export class SbNotificationModule { }
