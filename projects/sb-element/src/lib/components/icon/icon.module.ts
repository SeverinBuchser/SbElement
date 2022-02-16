import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';

import { SbIconComponent } from './icon.component';


@NgModule({
  declarations: [SbIconComponent],
  imports: [CommonModule, CoreModule],
  exports: [SbIconComponent]
})
export class IconModule { }
