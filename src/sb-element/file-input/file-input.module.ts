import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SbFileInputComponent } from './file-input';
import { SbIconModule } from '../icon';

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
