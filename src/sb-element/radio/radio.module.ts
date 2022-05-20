import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SbRadioComponent } from './radio.component';

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
