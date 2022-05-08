import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { SbBarModule } from '../bar';
import { SbCoreModule } from '../core';
import { SbFormsModule } from '../forms';
import { SbPaginatorModule } from '../paginator';

import { SbTabBarComponent } from './tab-bar';
import { SbTabComponent } from './tab';
import { SbTabContentComponent } from './tab-content';
import { SbTabLabelComponent } from './tab-label';
import { SbTabsComponent } from './tabs';

import {
  SbTabsModuleConfig,
  SB_TABS_CONFIG,
  SB_TABS_CONFIG_DEFAULT } from './tabs.module.config';

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
    SbBarModule,
    SbCoreModule,
    SbFormsModule,
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
