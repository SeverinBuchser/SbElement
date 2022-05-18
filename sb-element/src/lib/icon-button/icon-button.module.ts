import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbIconModule } from '../icon';

import { SbButtonModule } from '../forms/button';
import { SbIconButtonComponent } from './icon-button';

@NgModule({
  declarations: [
    SbIconButtonComponent
  ],
  imports: [
    CommonModule,
    SbButtonModule,
    SbIconModule,
  ],
  exports: [
    SbIconButtonComponent
  ]
})
export class SbIconButtonModule { }
