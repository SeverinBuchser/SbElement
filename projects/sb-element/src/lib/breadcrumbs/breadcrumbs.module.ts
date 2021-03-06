import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbIconModule } from '../icon';

import { SbBreadcrumbsComponent } from './breadcrumbs';

@NgModule({
  declarations: [SbBreadcrumbsComponent],
  imports: [CommonModule, SbIconModule],
  exports: [SbBreadcrumbsComponent]
})
export class SbBreadcrumbsModule { }
