import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbIconModule } from '../icon';

import { SbIconButtonComponent } from './icon-button';
import { SbButtonComponent } from './button';

@NgModule({
  declarations: [
    SbIconButtonComponent,
    SbButtonComponent
  ],
  imports: [
    CommonModule,
    SbIconModule,
  ],
  exports: [
    SbIconButtonComponent,
    SbButtonComponent
  ]
})
export class SbButtonModule { }
