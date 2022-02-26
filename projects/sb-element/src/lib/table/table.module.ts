import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbTableComponent } from './table.component';

@NgModule({
  declarations: [SbTableComponent],
  imports: [CommonModule],
  exports: [SbTableComponent]
})
export class SbTableModule { }
