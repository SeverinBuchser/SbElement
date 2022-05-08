import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { SbThemingModuleConfig, SB_THEMING_CONFIG } from "./theming.module.config";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SbThemingModule {
  constructor(@Optional() @SkipSelf() parentModule?: SbThemingModule) {
    if (parentModule) {
      throw new Error(
        'StyleModule is already loaded. Import it in the AppModule only');
    }
  }

  public static forRoot(
    config: SbThemingModuleConfig
  ): ModuleWithProviders<SbThemingModule> {
    return {
      ngModule: SbThemingModule,
      providers: [
        { provide: SB_THEMING_CONFIG, useValue: config }
      ]
    }
  }
}
