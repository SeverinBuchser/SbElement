import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbIconModule } from '../icon';

import { SbTimelineComponent } from './timeline.component';

/**
 * @category NgModule
 */
@NgModule({
  declarations: [SbTimelineComponent],
  imports: [CommonModule, SbIconModule],
  exports: [SbTimelineComponent]
})
export class SbTimelineModule { }
