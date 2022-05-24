import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbTableComponent } from './table.component';

/**
 * @category NgModule
 */
@NgModule({
  declarations: [SbTableComponent],
  imports: [CommonModule],
  exports: [SbTableComponent]
})
export class SbTableModule { }
