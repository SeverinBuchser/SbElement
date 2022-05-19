import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DocCoreModule } from '../doc-core';

import { BreadcrumbsApiDocComponent } from './api-doc';
import { BreadcrumbsDocComponent } from './breadcrumbs-doc';
import { BreadcrumbsExampleComponent } from './example';
import { SbBreadcrumbsModule, SbButtonModule, SbCardModule, SbGridModule } from 'sb-element';

@NgModule({
  declarations: [
    BreadcrumbsApiDocComponent,
    BreadcrumbsDocComponent,
    BreadcrumbsExampleComponent
  ],
  imports: [
    CommonModule,
    DocCoreModule,
    SbBreadcrumbsModule,
    SbGridModule,
    SbButtonModule,
    SbCardModule
  ],
  exports: [
    BreadcrumbsDocComponent
  ]
})
export class BreadcrumbsDocModule { }
