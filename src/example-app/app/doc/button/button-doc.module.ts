import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DocCoreModule } from '../doc-core';

import { ButtonApiDocComponent } from './api-doc';
import { ButtonDocComponent } from './button-doc';
import { ButtonExampleComponent } from './example';
import { SbButtonModule, SbCardModule, SbGridModule, SbIconModule } from 'sb-element';

@NgModule({
  declarations: [
    ButtonApiDocComponent,
    ButtonDocComponent,
    ButtonExampleComponent
  ],
  imports: [
    CommonModule,
    DocCoreModule,
    SbButtonModule,
    SbGridModule,
    SbButtonModule,
    SbCardModule,
    SbIconModule
  ],
  exports: [
    ButtonDocComponent
  ]
})
export class ButtonDocModule { }
