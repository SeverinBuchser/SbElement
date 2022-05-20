import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbContainerComponent } from './container.component';

@NgModule({
  declarations: [SbContainerComponent],
  imports: [CommonModule],
  exports: [SbContainerComponent]
})
export class SbContainerModule { }
