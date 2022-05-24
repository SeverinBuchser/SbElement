import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SbIconModule } from '../icon';

import { SbButtonModule } from '../button';

import { SbToggleButtonComponent } from './toggle-button';
import { SbToggleCheckboxComponent } from './toggle-checkbox';
import { SbToggleSwitchComponent } from './toggle-switch';

/**
 * @category NgModule
 */
@NgModule({
  declarations: [
    SbToggleButtonComponent,
    SbToggleCheckboxComponent,
    SbToggleSwitchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbButtonModule,
    SbIconModule
  ],
  exports: [
    SbToggleButtonComponent,
    SbToggleCheckboxComponent,
    SbToggleSwitchComponent,
  ]
})
export class SbToggleModule { }
