import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbSelectListComponent } from './select-list';

@NgModule({
  declarations: [SbSelectListComponent],
  imports: [
    CommonModule
  ],
  exports: [SbSelectListComponent]
})
export class SbSelectCoreModule { }
