import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SbIconModule } from '../../icon/icon.module';

import { SbDoubleNumberInputComponent } from './double-number-input';
import { SbNumberInputComponent } from './number-input';
import { SbNumberInputCoreComponent } from './number-input-core';

@NgModule({
  declarations: [
    SbDoubleNumberInputComponent,
    SbNumberInputComponent,
    SbNumberInputCoreComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbIconModule
  ],
  exports: [
    SbDoubleNumberInputComponent,
    SbNumberInputComponent,
  ]
})
export class SbNumberInputModule { }
