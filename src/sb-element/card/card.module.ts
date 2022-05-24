import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbCoreModule } from '../core';
import { SbIconModule } from '../icon';

import { SbCardContentComponent } from './card-content.component';
import { SbCardHeaderComponent } from './card-header.component';
import { SbCardImageComponent } from './card-image.component';
import { SbCardComponent } from './card.component';
import { SbExpansionCardComponent } from './expansion-card.component';

/**
 * @category NgModule
 */
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
