import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SbButtonComponent } from './button';


@NgModule({
  declarations: [SbButtonComponent],
  imports: [CommonModule],
  exports: [SbButtonComponent]
})
export class SbButtonModule { }
