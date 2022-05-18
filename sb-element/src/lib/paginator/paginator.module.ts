import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbIconButtonModule } from '../icon-button';

import {
  SbContentPaginationDirective,
  SbContentPaginatorComponent
} from './content-paginator';

@NgModule({
  declarations: [SbContentPaginationDirective, SbContentPaginatorComponent],
  imports: [CommonModule, SbIconButtonModule],
  exports: [SbContentPaginationDirective, SbContentPaginatorComponent]
})
export class SbPaginatorModule { }
