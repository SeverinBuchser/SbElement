import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerCardComponent } from './color-picker-card/color-picker-card.component';
import { SbElementModule } from 'sb-element';



@NgModule({
  declarations: [
    ColorPickerCardComponent
  ],
  imports: [
    CommonModule,
    SbElementModule,
  ],
  exports: [
    ColorPickerCardComponent
  ]
})
export class UtilModule { }
