import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbBarComponent } from './bar/bar.component';
import { SbNavBarComponent } from './nav-bar/nav-bar.component';
import { SbSidebarComponent } from './sidebar/sidebar.component';

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
