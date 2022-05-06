import { InjectionToken } from "@angular/core";

export interface SbTabsModuleConfig {
	animationDuration: string;
}

export const SB_TABS_CONFIG_DEFAULT: SbTabsModuleConfig = {
	animationDuration: '0.3s'
}

export const SB_TABS_CONFIG = new InjectionToken<SbTabsModuleConfig>('tabs.config');
