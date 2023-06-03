import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbCoreModule } from '../core';
import { SbIconModule } from '../icon';

import { SbCardComponent } from './card.component';
import { SbCardContentComponent } from './card-content.component';
import { SbCardContentDirective } from './card-content.directive';
import { SbCardHeaderComponent } from './card-header.component';
import { SbCardImageComponent } from './card-image.component';

/**
 * @category NgModule
 */
@NgModule({
  declarations: [
    SbCardComponent,
    SbCardContentComponent,
    SbCardContentDirective,
    SbCardHeaderComponent,
    SbCardImageComponent
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
    SbCardImageComponent
  ]
})
export class SbCardModule { }
