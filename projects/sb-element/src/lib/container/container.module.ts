import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbContainerComponent } from './container';

@NgModule({
  declarations: [SbContainerComponent],
  imports: [CommonModule],
  exports: [SbContainerComponent]
})
export class SbContainerModule { }
