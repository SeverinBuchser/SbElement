import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbSelectCoreModule } from './select-core';
import { SbSelectButtonModule } from './select-button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [SbSelectCoreModule, SbSelectButtonModule]
})
export class SbSelectModule { }
