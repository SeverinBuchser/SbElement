import { Inject, Injectable } from '@angular/core';
import { HighlightResult } from 'highlight.js';
import hljs from 'highlight.js/lib/core';

import { SbHighlightLanguage } from './highlight-language';
import { SbHighlightModuleConfig, SB_HIGHLIGHT_CONFIG } from './highlight.module.config';

@Injectable({
  providedIn: 'root'
})
export class SbHighlightService {
  private languages: Array<SbHighlightLanguage> = new Array();

  constructor(@Inject(SB_HIGHLIGHT_CONFIG) private config: SbHighlightModuleConfig) {
    hljs.configure({
      classPrefix: ''
    })

    this.register(this.config.languages)
  }

	private register(languages: Array<SbHighlightLanguage>): void {
    this.languages = languages;
		this.languages.forEach((language: SbHighlightLanguage) => {
			hljs.registerLanguage(language.name, language.languageFn);
		});
	}

  public languageExists(languageName: string): boolean {
    return this.languages.findIndex((language: SbHighlightLanguage) => {
      return language.name == languageName
    }) >= 0;
  }

  private replaceTabs(highlight: string, tabReplace?: string): string {
    if (!tabReplace) {
      tabReplace = this.config.tabReplace
    }
    return highlight.replaceAll('\t', tabReplace);
  }

  public highlight(
    highlight: string,
    language: string,
    tabReplace?: string
  ): HighlightResult {
    if (!this.languageExists(language)) {
      throw new Error(`Language '${language}' does either not exist or has not been`
        + ` registered!`);
    }
    return hljs.highlight(this.replaceTabs(highlight, tabReplace), { language })
  }
}
