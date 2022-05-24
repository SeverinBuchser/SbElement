import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { SbAlignDirective } from './align.directive';
import { SbAlignRelateiveDirective } from './align-relative.directive';

/**
 * @category NgModule
 */
@NgModule({
  declarations: [SbAlignDirective, SbAlignRelateiveDirective],
  imports: [CommonModule],
  exports: [SbAlignDirective, SbAlignRelateiveDirective],
})
export class SbAlignModule { }
