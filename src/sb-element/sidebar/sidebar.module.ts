import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SbCoreModule } from '../core';

import { SbSidebarContainerComponent } from './sidebar-container.component';
import { SbSidebarComponent } from './sidebar.component';

/**
 * @category NgModule
 */
@NgModule({
  declarations: [
    SbSidebarComponent,
    SbSidebarContainerComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    SbCoreModule,
  ],
  exports: [SbSidebarComponent]
})
export class SbSidebarModule {

}