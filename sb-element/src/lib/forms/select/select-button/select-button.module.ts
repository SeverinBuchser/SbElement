import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbButtonModule } from '../../../button';
import { SbCoreModule } from '../../../core';
import { SbIconModule } from '../../../icon';

import { SbSelectButtonComponent } from './select-button';
import { SbSelectButtonListComponent } from './select-button-list';
import { SbSelectButtonOverlayComponent } from './select-button-overlay';

@NgModule({
  declarations: [
    SbSelectButtonComponent,
    SbSelectButtonListComponent,
    SbSelectButtonOverlayComponent,
  ],
  imports: [
    CommonModule,
    SbButtonModule,
    SbCoreModule,
    SbIconModule
  ],
  exports: [
    SbSelectButtonComponent
  ]
})
export class SbSelectButtonModule { }
