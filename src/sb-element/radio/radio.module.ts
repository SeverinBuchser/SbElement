import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SbRadioComponent } from './radio.component';

/**
 * @category NgModule
 */
@NgModule({
  declarations: [
    SbRadioComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SbRadioComponent,
  ]
})
export class SbRadioModule { }
