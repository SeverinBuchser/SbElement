import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertDocModule } from './alert/alert-doc.module';
import { BreadcrumbsDocModule } from './breadcrumbs';
import { ButtonDocModule } from './button';
import { CalendarDocModule } from './calendar';
import { CardDocModule } from './card';
import { ContainerDocModule } from './container';
import { docConfig, DocConfig } from './doc.module.config';
import { DocComponent } from './doc.component';
import { SbLinkModule, SbNavBarModule, SbPaginatorModule } from 'sb-element';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SbNavBarModule,
    SbLinkModule,
    RouterModule,
    SbPaginatorModule
  ],
  exports: [
    AlertDocModule,
    BreadcrumbsDocModule,
    ButtonDocModule,
    CalendarDocModule,
    CardDocModule,
    ContainerDocModule
  ],
  providers: [
    { provide: DocConfig, useValue: docConfig}
  ],
  declarations: [
    DocComponent
  ]
})
export class DocModule { }
