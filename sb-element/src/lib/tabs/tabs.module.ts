import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { PortalModule } from '@angular/cdk/portal';

import { SbBarModule } from '../bar';
import { SbCoreModule } from '../core';
import { SbFormsModule } from '../forms';
import { SbPaginatorModule } from '../paginator';

import { SbTabComponent } from './tab';
import { SbTabBarComponent } from './tab-bar';
import { SbTabContentComponent } from './tab-content';
import { SbTabLabelComponent } from './tab-label';
import { SbTabsComponent } from './tabs';

import {
  SbTabsModuleConfig,
  SB_TABS_CONFIG,
  SB_TABS_CONFIG_DEFAULT } from './tabs.module.config';

@NgModule({
  declarations: [
    SbTabComponent,
    SbTabBarComponent,
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
    SbTabComponent,
    SbTabBarComponent,
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
