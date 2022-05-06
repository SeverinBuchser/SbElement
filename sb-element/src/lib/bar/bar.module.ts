import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbCoreModule } from '../core';
import { SbPaginatorModule } from '../paginator';

import { SbBarComponent } from './bar';
import { SbNavBarComponent } from './nav-bar';
import { SbSidebarComponent } from './sidebar';
import { SbNavBarContentComponent } from './nav-bar/nav-bar-content';

@NgModule({
  declarations: [
    SbBarComponent,
    SbNavBarComponent,
    SbSidebarComponent,
    SbNavBarContentComponent,
  ],
  imports: [
    CommonModule,
    SbCoreModule,
    SbPaginatorModule
  ],
  exports: [
    SbBarComponent,
    SbNavBarComponent,
    SbSidebarComponent,
    SbNavBarContentComponent,
  ]
})
export class SbBarModule { }
