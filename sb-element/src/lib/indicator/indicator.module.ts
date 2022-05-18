import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbProgressComponent } from './progress';

@NgModule({
  declarations: [SbProgressComponent],
  imports: [CommonModule],
  exports: [SbProgressComponent]
})
export class SbIndicatorModule { }
