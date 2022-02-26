import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbCardComponent } from './card';

@NgModule({
  declarations: [SbCardComponent],
  imports: [CommonModule],
  exports: [SbCardComponent]
})
export class SbCardModule { }
