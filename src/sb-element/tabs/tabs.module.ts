import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SbCoreModule } from '../core';
import { SbPaginatorModule } from '../paginator';

import { SbTabBarComponent } from './tab-bar.component';
import { SbTabContentComponent } from './tab-content.component';
import { SbTabLabelComponent } from './tab-label.component';
import { SbTabComponent } from './tab.component';
import { SbTabsComponent } from './tabs.component';

import {
  SbTabsModuleConfig,
  SB_TABS_CONFIG,
  SB_TABS_CONFIG_DEFAULT
} from './tabs.module.config';

@NgModule({
  declarations: [
    SbTabBarComponent,
    SbTabComponent,
    SbTabContentComponent,
    SbTabLabelComponent,
    SbTabsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    PortalModule,
    SbCoreModule,
    SbPaginatorModule,
  ],
  exports: [
    SbTabBarComponent,
    SbTabComponent,
    SbTabLabelComponent,
    SbTabsComponent,
  ],
  providers: [
    { provide: SB_TABS_CONFIG, useValue: SB_TABS_CONFIG_DEFAULT }
  ]
})
export class SbTabsModule {
  public static forRoot(config: SbTabsModuleConfig): ModuleWithProviders<SbTabsModule> {
    return {
      ngModule: SbTabsModule,
      providers: [
        { provide: SB_TABS_CONFIG, useValue: {
          ...SB_TABS_CONFIG_DEFAULT,
          ...config
        }}
      ]
    }
  }
}
