import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SbIconModule } from '../../icon/icon.module';

import { SbInputCoreComponent } from './core/input-core.component';
import { SbInputComponent } from './simple/input.component';
import { SbDoubleInputComponent } from './double/double-input.component';

@NgModule({
  declarations: [
    SbInputCoreComponent,
    SbInputComponent,
    SbDoubleInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbIconModule
  ],
  exports: [
    SbInputComponent,
    SbDoubleInputComponent,
  ]
})
export class SbInputModule { }
