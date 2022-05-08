import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SbIconModule } from '../../icon';

import { SbDoubleInputComponent } from './double-input';
import { SbInputComponent } from './input';
import { SbInputCoreComponent } from './input-core';

@NgModule({
  declarations: [
    SbDoubleInputComponent,
    SbInputComponent,
    SbInputCoreComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbIconModule
  ],
  exports: [
    SbDoubleInputComponent,
    SbInputComponent,
  ]
})
export class SbInputModule { }
