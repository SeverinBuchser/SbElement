import { InjectionToken } from "@angular/core";
import { SbHighlightLanguage } from "./highlight-language";

export interface SbHighlightOptions {
  languages: Array<SbHighlightLanguage>
}

export const SB_HIGHLIGHT_OPTIONS = new InjectionToken<SbHighlightOptions>('HIGHLIGHT_OPTIONS');
