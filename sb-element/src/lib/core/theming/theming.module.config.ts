import { InjectionToken } from "@angular/core";

export interface SbThemeConfig {
  name: string;
  href: string;
}

export interface SbThemingModuleConfig extends Array<SbThemeConfig> {}

export const SB_THEMING_CONFIG = new InjectionToken<SbThemingModuleConfig>('theming.config');
