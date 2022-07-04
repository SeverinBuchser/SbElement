import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SbCoreModule } from '../core';
import { SbPopperModule } from '../popper';

import { SbButtonModule } from '../button';

import { SbColorPickerComponent } from './color-picker';
import { SbSelectButtonModule } from './select-button';
import { SbSelectCheckboxComponent } from './select-checkbox';

/**
 * @category NgModule
 */
@NgModule({
  declarations: [
    SbColorPickerComponent,
    SbSelectCheckboxComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SbButtonModule,
    SbCoreModule,
    SbPopperModule
  ],
  exports: [
    SbColorPickerComponent,
    SbSelectButtonModule,
    SbSelectCheckboxComponent,
  ]
})
export class SbSelectModule { }
