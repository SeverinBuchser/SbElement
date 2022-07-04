import { Route } from '@angular/router';

import { DocComponent } from './doc.component';

import { SbAlertModuleDocComponent } from './sb-alert-module';
import { SbBreadcrumbsModuleDocComponent } from './sb-breadcrumbs-module';
import { SbButtonModuleDocComponent } from './sb-button-module';
import { SbCalendarModuleDocComponent } from './sb-calendar-module';
import { SbCardModuleDocComponent } from './sb-card-module';
import { SbContainerModuleDocComponent } from './sb-container-module';
import { SbFileInputModuleDocComponent } from './sb-file-input-module';

export const docRoute: Route = {
  path: 'documentation',
  component: DocComponent,
  children: [
		{
			path: 'sb-alert-module',
			component: SbAlertModuleDocComponent
		},
		{
			path: 'sb-breadcrumbs-module',
			component: SbBreadcrumbsModuleDocComponent
		},
		{
			path: 'sb-button-module',
			component: SbButtonModuleDocComponent
		},
		{
			path: 'sb-calendar-module',
			component: SbCalendarModuleDocComponent
		},
		{
			path: 'sb-card-module',
			component: SbCardModuleDocComponent
		},
		{
			path: 'sb-container-module',
			component: SbContainerModuleDocComponent
		},
		{
			path: 'sb-file-input-module',
			component: SbFileInputModuleDocComponent
		}
	]
};