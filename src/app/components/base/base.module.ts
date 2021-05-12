import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseThemeInputDirective } from './base-theme-input/base-theme-input.directive';
import { BaseSizeInputDirective } from './base-size-input/base-size-input.directive';
import { BaseThemeSizeInputDirective } from './base-theme-size-input/base-theme-size-input.directive';
import { BaseColorSizeInputDirective } from './base-color-size-input/base-color-size-input.directive';
import { BaseColorInputDirective } from './base-color-input/base-color-input.directive';



@NgModule({
  declarations: [
    BaseColorInputDirective,
    BaseThemeInputDirective,
    BaseSizeInputDirective,
    BaseThemeSizeInputDirective,
    BaseColorSizeInputDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BaseColorInputDirective,
    BaseThemeInputDirective,
    BaseSizeInputDirective,
    BaseThemeSizeInputDirective,
    BaseColorSizeInputDirective
  ]
})
export class BaseModule { }
