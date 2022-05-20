import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbAlertModule, SbButtonModule, SbCardModule, SbGridModule } from 'sb-element';

import { DocCoreModule } from '../doc-core';

import { AlertDocComponent } from './alert-doc';
import { AlertApiDocComponent } from './api-doc';
import { AlertExampleComponent } from './example';

@NgModule({
  declarations: [
    AlertApiDocComponent,
    AlertDocComponent,
    AlertExampleComponent
  ],
  imports: [
    CommonModule,
    DocCoreModule,
    SbAlertModule,
    SbButtonModule,
    SbCardModule,
    SbGridModule
  ],
  exports: [
    AlertDocComponent
  ]
})
export class AlertDocModule { }
