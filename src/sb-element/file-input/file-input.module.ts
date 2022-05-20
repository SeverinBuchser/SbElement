import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SbIconModule } from '../icon';

import { SbFileInputComponent } from './file-input.component';

@NgModule({
  declarations: [
    SbFileInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbIconModule
  ],
  exports: [
    SbFileInputComponent,
  ]
})
export class SbFileInputModule { }
