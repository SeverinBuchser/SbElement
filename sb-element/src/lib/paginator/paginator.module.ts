import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbFormsModule } from '../forms';

import {
  SbContentPaginationDirective,
  SbContentPaginatorComponent } from './content-paginator';

@NgModule({
  declarations: [SbContentPaginationDirective, SbContentPaginatorComponent],
  imports: [CommonModule, SbFormsModule],
  exports: [SbContentPaginationDirective, SbContentPaginatorComponent]
})
export class SbPaginatorModule { }
