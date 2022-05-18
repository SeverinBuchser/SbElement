import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickerCardComponent } from './picker-card/picker-card.component';
import { SbElementModule } from 'sb-element';
import { ThemeToggleSwitchComponent } from './theme-toggle-switch/theme-toggle-switch.component';
import { FormsModule } from '@angular/forms';
import { PickerCardContentComponent } from './picker-card/picker-card-content/picker-card-content.component';
import { FormPickerComponent } from './form-picker/form-picker.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { LookPickerComponent } from './look-picker/look-picker.component';



@NgModule({
  declarations: [
    PickerCardComponent,
    ThemeToggleSwitchComponent,
    PickerCardContentComponent,
    FormPickerComponent,
    ColorPickerComponent,
    LookPickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbElementModule,
  ],
  exports: [
    PickerCardComponent,
    ThemeToggleSwitchComponent,
    PickerCardContentComponent,
    FormPickerComponent,
    ColorPickerComponent,
    LookPickerComponent,
  ]
})
export class UtilModule { }
