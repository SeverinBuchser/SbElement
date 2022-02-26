import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SbIconModule } from '../../icon/icon.module';

import { SbSpinnerCoreComponent } from './core/spinner-core.component';
import { SbSpinnerComponent } from './simple/spinner.component';
import { SbDoubleSpinnerComponent } from './double/double-spinner.component';

@NgModule({
  declarations: [
    SbSpinnerCoreComponent,
    SbSpinnerComponent,
    SbDoubleSpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbIconModule
  ],
  exports: [
    SbSpinnerComponent,
    SbDoubleSpinnerComponent
  ]
})
export class SbSpinnerModule { }
