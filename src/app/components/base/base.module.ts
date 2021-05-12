import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseColorInputComponent } from './base-color-input/base-color-input.component';
import { BaseThemeInputComponent } from './base-theme-input/base-theme-input.component';
import { BaseSizeInputComponent } from './base-size-input/base-size-input.component';
import { BaseThemeSizeInputComponent } from './base-theme-size-input/base-theme-size-input.component';
import { BaseColorSizeInputComponent } from './base-color-size-input/base-color-size-input.component';



@NgModule({
  declarations: [
    BaseColorInputComponent,
    BaseThemeInputComponent,
    BaseSizeInputComponent,
    BaseThemeSizeInputComponent,
    BaseColorSizeInputComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BaseColorInputComponent,
    BaseThemeInputComponent,
    BaseSizeInputComponent,
    BaseThemeSizeInputComponent
  ]
})
export class BaseModule { }
