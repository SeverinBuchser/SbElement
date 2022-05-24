import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { SbCoreModule } from "../core";
import { SbIconModule } from "../icon";

import { PortalModule } from '@angular/cdk/portal';
import { SbAlertBoxComponent } from './alert-box.component';
import {
  SbAlertBoxConfig,
  SbAlertConfig,
  SB_ALERT_BOX_CONFIG_DEFAULT,
  SB_ALERT_BOX_CONFIG_DEFAULT_DEFAULT,
  SB_ALERT_CONFIG_DEFAULT,
  SB_ALERT_CONFIG_DEFAULT_DEFAULT
} from './alert-config';
import { SbAlertContainerComponent } from './alert-container.component';

/**
 * @category NgModule
 */
@NgModule({
  declarations: [
    SbAlertBoxComponent,
    SbAlertContainerComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    SbCoreModule,
    SbIconModule
  ],
  exports: [
    SbAlertBoxComponent,
    SbAlertContainerComponent
  ],
  providers: [
    {
      provide: SB_ALERT_CONFIG_DEFAULT,
      useValue: SB_ALERT_CONFIG_DEFAULT_DEFAULT
    },
    {
      provide: SB_ALERT_BOX_CONFIG_DEFAULT,
      useValue: SB_ALERT_BOX_CONFIG_DEFAULT_DEFAULT
    }
  ]
})
export class SbAlertModule {
  public static forRoot(
    alertConfig: Partial<SbAlertConfig>,
    alertBoxConfig: Partial<SbAlertBoxConfig>
  ): ModuleWithProviders<SbAlertModule> {
    return {
      ngModule: SbAlertModule,
      providers: [
        {
          provide: SB_ALERT_BOX_CONFIG_DEFAULT,
          useValue: {
            ...SB_ALERT_BOX_CONFIG_DEFAULT_DEFAULT,
            ...alertBoxConfig
          }
        },
        {
          provide: SB_ALERT_CONFIG_DEFAULT,
          useValue: {
            ...SB_ALERT_CONFIG_DEFAULT_DEFAULT,
            ...alertConfig
          }
        }
      ]
    }
  }
}
