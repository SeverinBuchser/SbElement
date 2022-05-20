import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbIconModule } from '../icon';

import { SbButtonComponent } from './button.component';
import { SbIconButtonComponent } from './icon-button.component';

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
