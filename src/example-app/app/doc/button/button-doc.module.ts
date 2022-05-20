import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbButtonModule, SbCardModule, SbGridModule } from 'sb-element';

import { DocCoreModule } from '../doc-core';

import { ButtonApiDocComponent } from './api-doc';
import { ButtonDocComponent } from './button-doc';
import { ButtonExampleComponent } from './example';

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
    SbCardModule,
    SbGridModule
  ],
  exports: [
    ButtonDocComponent
  ]
})
export class ButtonDocModule { }
