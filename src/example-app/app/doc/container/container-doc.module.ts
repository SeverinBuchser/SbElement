import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbContainerModule, SbGridModule, SbIconModule } from 'sb-element';

import { DocCoreModule } from '../doc-core';

import { ContainerApiDocComponent } from './api-doc';
import { ContainerDocComponent } from './container-doc';
import { ContainerExampleComponent } from './example';

@NgModule({
  declarations: [
    ContainerApiDocComponent,
    ContainerDocComponent,
    ContainerExampleComponent
  ],
  imports: [
    CommonModule,
    DocCoreModule,
    SbContainerModule,
    SbGridModule,
    SbIconModule
  ],
  exports: [
    ContainerDocComponent
  ]
})
export class ContainerDocModule { }
