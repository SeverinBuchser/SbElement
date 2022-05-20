import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbCardModule, SbGridModule, SbIconModule } from 'sb-element';

import { DocCoreModule } from '../doc-core';

import { CardApiDocComponent } from './api-doc';
import { CardDocComponent } from './card-doc';
import { CardExampleComponent } from './example';

@NgModule({
  declarations: [
    CardApiDocComponent,
    CardDocComponent,
    CardExampleComponent
  ],
  imports: [
    CommonModule,
    DocCoreModule,
    SbCardModule,
    SbGridModule,
    SbIconModule
  ],
  exports: [
    CardDocComponent
  ]
})
export class CardDocModule { }
