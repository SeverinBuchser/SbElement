import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbBreadcrumbsModule } from 'sb-element';

import { DocCoreModule } from '../doc-core';

import { BreadcrumbsApiDocComponent } from './api-doc';
import { BreadcrumbsDocComponent } from './breadcrumbs-doc';
import { BreadcrumbsExampleComponent } from './example';

@NgModule({
  declarations: [
    BreadcrumbsApiDocComponent,
    BreadcrumbsDocComponent,
    BreadcrumbsExampleComponent
  ],
  imports: [
    CommonModule,
    DocCoreModule,
    SbBreadcrumbsModule
  ],
  exports: [
    BreadcrumbsDocComponent
  ]
})
export class BreadcrumbsDocModule { }
