import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbButtonModule } from '../button';
import { SbContentPaginationDirective } from './content-pagination.directive';
import { SbContentPaginatorComponent } from './content-paginator.component';

/**
 * @category NgModule
 */
@NgModule({
  declarations: [SbContentPaginationDirective, SbContentPaginatorComponent],
  imports: [CommonModule, SbButtonModule],
  exports: [SbContentPaginationDirective, SbContentPaginatorComponent]
})
export class SbPaginatorModule { }