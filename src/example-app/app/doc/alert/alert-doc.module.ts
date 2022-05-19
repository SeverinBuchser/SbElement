import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DocCoreModule } from '../doc-core';

import { AlertApiDocComponent } from './api-doc';
import { AlertDocComponent } from './alert-doc';
import { AlertExampleComponent } from './example';
import { SbAlertModule, SbButtonModule, SbCardModule, SbGridModule } from 'sb-element';

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
    SbGridModule,
    SbButtonModule,
    SbCardModule
  ],
  exports: [
    AlertDocComponent
  ]
})
export class AlertDocModule { }
