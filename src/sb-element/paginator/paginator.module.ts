import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbButtonModule } from '../button';
import { SbContentPaginationDirective } from './content-pagination';
import { SbContentPaginatorComponent } from './content-paginator';


@NgModule({
  declarations: [SbContentPaginationDirective, SbContentPaginatorComponent],
  imports: [CommonModule, SbButtonModule],
  exports: [SbContentPaginationDirective, SbContentPaginatorComponent]
})
export class SbPaginatorModule { }
