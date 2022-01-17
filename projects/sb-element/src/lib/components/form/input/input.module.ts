import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { CoreModule } from '../../../core/core.module';
import { IconModule } from '../../icon/icon.module';

import { InputCoreComponent } from './core/input-core/input-core.component';
import { InputCoreWrapperComponent } from './core/input-core-wrapper/input-core-wrapper.component';

import { InputComponent } from './simple/input.component';
import { DoubleInputComponent } from './double/double-input.component';

@NgModule({
  declarations: [
    InputCoreComponent,
    InputCoreWrapperComponent,
    InputComponent,
    DoubleInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    IconModule
  ],
  exports: [
    InputComponent,
    DoubleInputComponent
  ]
})
export class InputModule { }
