import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemesConfig } from "./theme";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class StyleModule {
  constructor(@Optional() @SkipSelf() parentModule?: StyleModule) {
    if (parentModule) {
      throw new Error(
        'StyleModule is already loaded. Import it in the AppModule only');
    }
  }

  public static forRoot(themesConfig: ThemesConfig): ModuleWithProviders<StyleModule> {
    return {
      ngModule: StyleModule,
      providers: [
        {provide: ThemesConfig, useValue: themesConfig}
      ]
    }
  }
}
