import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbGridModule } from '../grid';
import { SbIconModule } from '../icon';

import { SbTimelineComponent } from './timeline';

@NgModule({
  declarations: [SbTimelineComponent],
  imports: [CommonModule, SbGridModule, SbIconModule],
  exports: [SbTimelineComponent]
})
export class SbTimelineModule { }
