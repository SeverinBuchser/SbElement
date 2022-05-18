import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SbSliderComponent } from './slider';

@NgModule({
  declarations: [
    SbSliderComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SbSliderComponent,
  ]
})
export class SbSliderModule { }
