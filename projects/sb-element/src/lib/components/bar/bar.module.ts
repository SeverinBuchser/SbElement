import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarComponent } from './default/bar.component';
import { NavBarComponent } from './navigation/nav-bar.component';



@NgModule({
  declarations: [
    BarComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BarComponent,
    NavBarComponent
  ]
})
export class BarModule { }
