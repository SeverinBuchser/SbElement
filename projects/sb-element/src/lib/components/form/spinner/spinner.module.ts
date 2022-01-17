import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '../../../core/core.module';
import { IconModule } from '../../icon/icon.module';

import { SpinnerCoreComponent } from './core/spinner-core.component';
import { SpinnerComponent } from './simple/spinner.component';
import { DoubleSpinnerComponent } from './double/double-spinner.component';

@NgModule({
  declarations: [
    SpinnerCoreComponent,
    SpinnerComponent,
    DoubleSpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    IconModule
  ],
  exports: [
    SpinnerComponent,
    DoubleSpinnerComponent
  ]
})
export class SpinnerModule { }
