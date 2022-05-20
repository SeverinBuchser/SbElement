import { InjectionToken } from '@angular/core';
import { SbHighlightLanguage } from './highlight-language';

export interface SbHighlightModuleConfig {
  languages: Array<SbHighlightLanguage>,
  tabReplace: string
}

export const SB_HIGHLIGHT_CONFIG_DEFAULT: SbHighlightModuleConfig = {
  languages: [],
  tabReplace: '   '
}

export const SB_HIGHLIGHT_CONFIG = new InjectionToken<SbHighlightModuleConfig>(
  'highlight.config'
);
