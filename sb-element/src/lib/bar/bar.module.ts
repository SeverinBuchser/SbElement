import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbCoreModule } from '../core';
import { SbPaginatorModule } from '../paginator';

import { SbBarComponent } from './bar';
import { SbNavBarComponent, SbNavBarContentComponent } from './nav-bar';

@NgModule({
  declarations: [
    SbBarComponent,
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
    SbBarComponent,
    SbNavBarComponent,
    SbNavBarContentComponent
  ]
})
export class SbBarModule { }
