import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbCoreModule } from '../core';
import { SbPaginatorModule } from '../paginator';

import { SbNavBarContentComponent } from './nav-bar-content';
import { SbNavBarComponent } from './nav-bar';

@NgModule({
  declarations: [
    SbNavBarComponent,
    SbNavBarContentComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    SbCoreModule,
    SbPaginatorModule
  ],
  exports: [
    SbNavBarComponent,
    SbNavBarContentComponent
  ]
})
export class SbNavBarModule { }
