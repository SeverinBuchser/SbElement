import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


 import { SbButtonModule } from '../button';


import { SbToggleButtonComponent } from './toggle-button';
import { SbToggleSwitchComponent } from './toggle-switch';


@NgModule({
  declarations: [SbToggleButtonComponent, SbToggleSwitchComponent],
  imports: [CommonModule, SbButtonModule],
  exports: [SbToggleButtonComponent, SbToggleSwitchComponent]
})
export class SbToggleModule { }
