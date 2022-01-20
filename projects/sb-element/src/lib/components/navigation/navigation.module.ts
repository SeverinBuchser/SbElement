import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavLinkComponent } from './nav-link/nav-link.component';



@NgModule({
  declarations: [
    NavBarComponent,
    NavLinkComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavBarComponent,
    NavLinkComponent
  ]
})
export class NavigationModule { }
