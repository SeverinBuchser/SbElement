import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';

import { IconComponent } from './icon.component';



@NgModule({
  declarations: [
    IconComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    IconComponent
  ]
})
export class IconModule { }
