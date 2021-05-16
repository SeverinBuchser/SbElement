import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorInputDirective } from './style-input/color-input.directive';
import { ThemeColorInputDirective } from './style-input/theme-color-input.directive';
import { SizeInputDirective } from './style-input/size-input.directive';
import { SizeColorInputDirective } from './style-input/size-color-input.directive';
import { SizeThemeColorInputDirective } from './style-input/size-theme-color-input.directive';



@NgModule({
  declarations: [
    ColorInputDirective,
    ThemeColorInputDirective,
    SizeInputDirective,
    SizeColorInputDirective,
    SizeThemeColorInputDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ColorInputDirective,
    ThemeColorInputDirective,
    SizeInputDirective,
    SizeColorInputDirective,
    SizeThemeColorInputDirective,
  ]
})
export class BaseModule { }
