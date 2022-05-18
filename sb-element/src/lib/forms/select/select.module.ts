import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SbCoreModule } from '../../core';
import { SbGridModule } from '../../grid';
import { SbPopperModule } from '../../popper';

import { SbButtonModule } from '../../button';
import { SbToggleModule } from '../../toggle';

import { SbColorPickerComponent } from './color-picker';
import { SbSelectButtonModule } from './select-button';
import { SbSelectCheckboxComponent } from './select-checkbox';

@NgModule({
  declarations: [
    SbColorPickerComponent,
    SbSelectCheckboxComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbCoreModule,
    SbGridModule,
    SbPopperModule,
    SbButtonModule,
    SbToggleModule,
  ],
  exports: [
    SbColorPickerComponent,
    SbSelectButtonModule,
    SbSelectCheckboxComponent,
  ]
})
export class SbSelectModule { }
