import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbBarComponent } from './bar';
import { SbNavBarComponent } from './nav-bar';
import { SbSidebarComponent } from './sidebar';

@NgModule({
  declarations: [
    SbBarComponent,
    SbNavBarComponent,
    SbSidebarComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SbBarComponent,
    SbNavBarComponent,
    SbSidebarComponent,
  ]
})
export class SbBarModule { }
