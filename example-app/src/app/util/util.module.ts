import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerCardComponent } from './color-picker-card/color-picker-card.component';
import { SbElementModule } from 'sb-element';
import { ThemeToggleSwitchComponent } from './theme-toggle-switch/theme-toggle-switch.component';
import { FormsModule } from '@angular/forms';
import { ColorPickerCardContentComponent } from './color-picker-card/color-picker-card-content/color-picker-card-content.component';



@NgModule({
  declarations: [
    ColorPickerCardComponent,
    ThemeToggleSwitchComponent,
    ColorPickerCardContentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbElementModule,
  ],
  exports: [
    ColorPickerCardComponent,
    ThemeToggleSwitchComponent,
    ColorPickerCardContentComponent
  ]
})
export class UtilModule { }
