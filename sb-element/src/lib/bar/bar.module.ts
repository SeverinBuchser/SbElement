import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbCoreModule } from '../core';
import { SbFormsModule } from '../forms';
import { SbPaginatorModule } from '../paginator';

import { SbBarComponent } from './bar';
import { SbNavBarComponent } from './nav-bar';
import { SbTabBarComponent } from './tab-bar';
import { SbSidebarComponent } from './sidebar';
import { SbNavBarContentComponent } from './nav-bar/nav-bar-content';
import { SbTabComponent } from './tab-bar';

@NgModule({
  declarations: [
    SbBarComponent,
    SbNavBarComponent,
    SbTabBarComponent,
    SbSidebarComponent,
    SbNavBarContentComponent,
    SbTabComponent,
  ],
  imports: [
    CommonModule,
    SbCoreModule,
    SbFormsModule,
    SbPaginatorModule
  ],
  exports: [
    SbBarComponent,
    SbNavBarComponent,
    SbTabBarComponent,
    SbSidebarComponent,
    SbNavBarContentComponent,
    SbTabComponent
  ]
})
export class SbBarModule { }
