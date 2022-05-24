import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbLinkComponent } from './link.component';

/**
 * @category NgModule
 */
@NgModule({
  declarations: [SbLinkComponent],
  imports: [CommonModule],
  exports: [SbLinkComponent]
})
export class SbLinkModule { }
