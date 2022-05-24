import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbGridComponent } from './grid.component';

/**
 * @category NgModule
 */
@NgModule({
  declarations: [SbGridComponent],
  imports: [CommonModule],
  exports: [SbGridComponent]
})
export class SbGridModule { }
