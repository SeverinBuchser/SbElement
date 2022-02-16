import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from "../../core";
import { IconModule } from "../icon";

import { SbAlertBoxComponent } from './alert-box';
import { SbAlertComponent } from './alert';

@NgModule({
  declarations: [SbAlertBoxComponent, SbAlertComponent],
  imports: [CommonModule, CoreModule, IconModule],
  exports: [SbAlertBoxComponent, SbAlertComponent]
})
export class NotificationModule { }
