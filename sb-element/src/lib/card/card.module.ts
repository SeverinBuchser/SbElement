import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbCoreModule } from '../core';
import { SbIconModule } from '../icon';

import { SbCardComponent } from './card';
import { SbCardContentComponent } from './card-content';
import { SbCardHeaderComponent } from './card-header';
import { SbCardImageComponent } from './card-image';
import { SbExpansionCardComponent } from './expansion-card';

@NgModule({
  declarations: [
    SbCardComponent,
    SbCardContentComponent,
    SbCardHeaderComponent,
    SbCardImageComponent,
    SbExpansionCardComponent,
  ],
  imports: [
    CommonModule,
    SbCoreModule,
    SbIconModule
  ],
  exports: [
    SbCardComponent,
    SbCardContentComponent,
    SbCardHeaderComponent,
    SbCardImageComponent,
    SbExpansionCardComponent,
  ]
})
export class SbCardModule { }
