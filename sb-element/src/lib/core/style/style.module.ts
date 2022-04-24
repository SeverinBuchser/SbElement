import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemesConfig } from "./theme";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: ThemesConfig,
      useValue: [
        { name: 'light', href: 'sb-light.css' }
      ]
    }
  ]
})
export class SbStyleModule {
  constructor(@Optional() @SkipSelf() parentModule?: SbStyleModule) {
    if (parentModule) {
      throw new Error(
        'StyleModule is already loaded. Import it in the AppModule only');
    }
  }

  public static forRoot(themesConfig: ThemesConfig): ModuleWithProviders<SbStyleModule> {
    return {
      ngModule: SbStyleModule,
      providers: [
        { provide: ThemesConfig, useValue: themesConfig }
      ]
    }
  }
}
