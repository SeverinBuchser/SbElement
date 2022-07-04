import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SbElementModule } from 'sb-element';
import { DocCoreModule } from './doc-core';
import { DocComponent } from './doc.component';
import { DocRoutePipe } from './doc-route.pipe';

import { SbAlertModuleDocComponent } from './sb-alert-module';
import { SbBreadcrumbsModuleDocComponent } from './sb-breadcrumbs-module';
import { SbButtonModuleDocComponent } from './sb-button-module';
import { SbCalendarModuleDocComponent } from './sb-calendar-module';
import { SbCardModuleDocComponent } from './sb-card-module';
import { SbContainerModuleDocComponent } from './sb-container-module';
import { SbFileInputModuleDocComponent } from './sb-file-input-module';

@NgModule({
  declarations: [
    SbAlertModuleDocComponent,
		SbBreadcrumbsModuleDocComponent,
		SbButtonModuleDocComponent,
		SbCalendarModuleDocComponent,
		SbCardModuleDocComponent,
		SbContainerModuleDocComponent,
    SbFileInputModuleDocComponent,
    DocComponent,
    DocRoutePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    PortalModule,
    SbElementModule,
    DocCoreModule
  ]
})
export class DocModule { }
