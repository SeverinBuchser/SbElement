import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SbButtonModule } from '../../button';
import { SbCoreModule } from '../../../core';
import { SbIconModule } from '../../../icon';
import { SbPopperModule } from '../../../popper';
import { SbSelectCoreModule } from '../select-core';

import { SbSelectButtonOverlayComponent } from './select-button-overlay';
import { SbSelectButtonListComponent } from './select-button-list';
import { SelectButtonComponent } from './select-button';

@NgModule({
  declarations: [
    SbSelectButtonOverlayComponent,
    SbSelectButtonListComponent,
    SelectButtonComponent
  ],
  imports: [
    CommonModule,
    SbButtonModule,
    SbCoreModule,
    SbIconModule,
    SbPopperModule,
    SbSelectCoreModule
  ],
  exports: [
    SelectButtonComponent
  ]
})
export class SbSelectButtonModule { }
