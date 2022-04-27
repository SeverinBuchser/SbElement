import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbToggleModule } from '../toggle';

import { SbSelectButtonModule } from './select-button';
import { SbSelectCheckboxComponent } from './select-checkbox';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SbSelectCheckboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbToggleModule
  ],
  exports: [
    SbSelectCheckboxComponent,
    SbSelectButtonModule
  ]
})
export class SbSelectModule { }
