import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDocModule } from './alert/alert-doc.module';
import { BreadcrumbsDocModule } from './breadcrumbs';



@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    AlertDocModule,
    BreadcrumbsDocModule
  ]
})
export class DocModule { }
