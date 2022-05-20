import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbGridComponent } from './grid.component';

@NgModule({
  declarations: [SbGridComponent],
  imports: [CommonModule],
  exports: [SbGridComponent]
})
export class SbGridModule { }
