import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbCoreModule } from '../core';
import { SbPaginatorModule } from '../paginator';

import { SbBarComponent } from './bar';
import { SbNavBarComponent } from './nav-bar';
import { SbNavBarContentComponent } from './nav-bar/nav-bar-content';
import { SbSidebarComponent } from './sidebar';

@NgModule({
  declarations: [
    SbBarComponent,
    SbNavBarComponent,
    SbNavBarContentComponent,
    SbSidebarComponent,
  ],
  imports: [
    CommonModule,
    SbCoreModule,
    SbPaginatorModule
  ],
  exports: [
    SbBarComponent,
    SbNavBarComponent,
    SbNavBarContentComponent,
    SbSidebarComponent,
  ]
})
export class SbBarModule { }
