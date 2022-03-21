import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbCoreModule } from '../core';
import { SbIconModule } from '../icon';

import { SbCardComponent } from './card';
import { SbExpansionCardComponent } from './expansion-card';
import { SbCardHeaderComponent } from './card-header';
import { SbCardImageDirective } from './card-image';
import { SbCardContentComponent } from './card-content';

@NgModule({
  declarations: [
    SbCardComponent,
    SbExpansionCardComponent,
    SbCardContentComponent,
    SbCardHeaderComponent,
    SbCardImageDirective,
  ],
  imports: [CommonModule, SbCoreModule, SbIconModule],
  exports: [
    SbCardComponent,
    SbExpansionCardComponent,
    SbCardContentComponent,
    SbCardHeaderComponent,
    SbCardImageDirective,
  ]
})
export class SbCardModule { }
