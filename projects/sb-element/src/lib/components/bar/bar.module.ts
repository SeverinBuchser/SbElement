import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbBarComponent } from './default/bar.component';
import { SbNavBarComponent } from './navigation/nav-bar.component';
import { SbSidebarComponent } from './side/sidebar.component';



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
