import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SbButtonModule } from '../button';
import { SbCoreModule } from '../../core';
import { SbGridModule } from '../../grid';
import { SbToggleModule } from '../toggle';
import { SbPopperModule } from '../../popper';

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
    SbButtonModule,
    SbCoreModule,
    SbGridModule,
    SbToggleModule,
    SbPopperModule,
  ],
  exports: [
    SbColorPickerComponent,
    SbSelectCheckboxComponent,
    SbSelectButtonModule,
  ]
})
export class SbSelectModule { }
