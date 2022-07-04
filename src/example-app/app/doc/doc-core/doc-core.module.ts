import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleDocComponent } from './module-doc.component';
import { SbTabsModule } from 'sb-element';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [
    ModuleDocComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    SbTabsModule
  ],
  exports: [
    ModuleDocComponent
  ]
})
export class DocCoreModule { }
