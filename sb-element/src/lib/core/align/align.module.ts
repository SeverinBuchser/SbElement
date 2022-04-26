import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SbAlignDirective } from './align.directive';
import { SbAlignRelateiveDirective } from './align-relative.directive';

@NgModule({
  declarations: [SbAlignDirective, SbAlignRelateiveDirective],
  imports: [CommonModule],
  exports: [SbAlignDirective, SbAlignRelateiveDirective],
})
export class SbAlignModule { }
