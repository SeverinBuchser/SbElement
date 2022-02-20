import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SbCoreModule } from "../../core";
import { SbIconModule } from "../icon";

import { SbAlertBoxComponent } from './alert-box';
import { SbAlertComponent } from './alert';

@NgModule({
  declarations: [SbAlertBoxComponent, SbAlertComponent],
  imports: [CommonModule, SbCoreModule, SbIconModule],
  exports: [SbAlertBoxComponent, SbAlertComponent]
})
export class SbNotificationModule { }
