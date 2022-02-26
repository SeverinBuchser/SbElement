import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SbProgressComponent } from './progress/progress.component';



@NgModule({
  declarations: [SbProgressComponent],
  imports: [CommonModule],
  exports: [SbProgressComponent]
})
export class SbIndicatorModule { }
