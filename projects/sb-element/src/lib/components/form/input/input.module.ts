import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { CoreModule } from '../../../core/core.module';
import { IconModule } from '../../icon/icon.module';

import { InputCoreComponent } from './core/input-core/input-core.component';

import { InputComponent } from './simple/input.component';
import { DoubleInputComponent } from './double/double-input.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerCoreComponent } from './core/spinner-core/spinner-core.component';

@NgModule({
  declarations: [
    InputCoreComponent,
    InputComponent,
    DoubleInputComponent,
    SpinnerComponent,
    SpinnerCoreComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    IconModule
  ],
  exports: [
    InputComponent,
    DoubleInputComponent,
    SpinnerComponent
  ]
})
export class InputModule { }
