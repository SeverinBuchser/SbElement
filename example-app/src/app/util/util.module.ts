import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerCardComponent } from './color-picker-card/color-picker-card.component';
import { SbElementModule } from 'sb-element';
import { ThemeToggleSwitchComponent } from './theme-toggle-switch/theme-toggle-switch.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ColorPickerCardComponent,
    ThemeToggleSwitchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbElementModule,
  ],
  exports: [
    ColorPickerCardComponent,
    ThemeToggleSwitchComponent
  ]
})
export class UtilModule { }
