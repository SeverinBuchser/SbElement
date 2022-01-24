import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarComponent } from './default/bar.component';
import { NavBarComponent } from './navigation/nav-bar.component';
import { SidebarComponent } from './side/sidebar.component';
import { SidebarTriggerDirective } from './side/sidebar-trigger.directive';



@NgModule({
  declarations: [
    BarComponent,
    NavBarComponent,
    SidebarComponent,
    SidebarTriggerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BarComponent,
    NavBarComponent,
    SidebarComponent,
    SidebarTriggerDirective
  ]
})
export class BarModule { }
