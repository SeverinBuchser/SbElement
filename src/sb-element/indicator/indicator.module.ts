import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbProgressComponent } from './progress.component';

/**
 * @category NgModule
 */
@NgModule({
  declarations: [SbProgressComponent],
  imports: [CommonModule],
  exports: [SbProgressComponent]
})
export class SbIndicatorModule { }
