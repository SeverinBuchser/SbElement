import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbCoreModule } from '../core';
import { SbIconModule } from '../icon';

import { SbExpansionCardComponent } from './expansion-card';

@NgModule({
  declarations: [SbExpansionCardComponent],
  imports: [CommonModule, SbCoreModule, SbIconModule],
  exports: [SbExpansionCardComponent]
})
export class SbExpansionCardModule { }
