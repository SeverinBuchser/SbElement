import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbIconModule } from '../icon';

import { SbBreadcrumbsComponent } from './breadcrumbs.component';

@NgModule({
  declarations: [SbBreadcrumbsComponent],
  imports: [CommonModule, SbIconModule],
  exports: [SbBreadcrumbsComponent]
})
export class SbBreadcrumbsModule { }
