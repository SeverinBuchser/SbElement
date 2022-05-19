import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDocModule } from './alert/alert-doc.module';
import { BreadcrumbsDocModule } from './breadcrumbs';
import { ButtonDocModule } from './button';



@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    AlertDocModule,
    BreadcrumbsDocModule,
    ButtonDocModule
  ]
})
export class DocModule { }
