import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarComponent } from './default/bar.component';
import { NavBarComponent } from './navigation/nav-bar.component';
import { SidebarComponent } from './side/sidebar.component';



@NgModule({
  declarations: [
    BarComponent,
    NavBarComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    BarComponent,
    NavBarComponent,
    SidebarComponent,
  ]
})
export class BarModule { }
