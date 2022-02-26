import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbLinkComponent } from './link.component';

@NgModule({
  declarations: [SbLinkComponent],
  imports: [CommonModule],
  exports: [SbLinkComponent]
})
export class SbLinkModule { }
