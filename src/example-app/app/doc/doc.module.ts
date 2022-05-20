import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDocModule } from './alert/alert-doc.module';
import { BreadcrumbsDocModule } from './breadcrumbs';
import { ButtonDocModule } from './button';
import { CalendarDocModule } from './calendar';
import { CardDocModule } from './card';
import { ContainerDocModule } from './container';



@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    AlertDocModule,
    BreadcrumbsDocModule,
    ButtonDocModule,
    CalendarDocModule,
    CardDocModule,
    ContainerDocModule
  ]
})
export class DocModule { }
