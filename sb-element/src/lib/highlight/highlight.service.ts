import { Inject, Injectable } from '@angular/core';
import { SbHighlightLanguage } from './highlight-language';
import { SB_HIGHLIGHT_OPTIONS, SbHighlightOptions } from './highlight-options';
import hljs from 'highlight.js/lib/core';
import { HighlightResult } from 'highlight.js';


@Injectable({
  providedIn: 'root'
})
export class SbHighlightService {
  private languages: Array<SbHighlightLanguage> = new Array();

  constructor(@Inject(SB_HIGHLIGHT_OPTIONS) private options?: SbHighlightOptions) {
    hljs.configure({
      classPrefix: ''
    })

    if (this.options) {
      this.register(this.options.languages)
    }
  }

	private register(languages: Array<SbHighlightLanguage>): void {
    this.languages = languages;
		this.languages.forEach((language: SbHighlightLanguage) => {
			hljs.registerLanguage(language.name, language.languageFn);
		});
	}

  public languageExists(languageName: string): boolean {
    return this.languages.findIndex((language: SbHighlightLanguage) => language.name == languageName) >= 0;
  }

  private replaceTabs(code: string, tabReplace: string = '   '): string {
    return code.replaceAll('\t', tabReplace);
  }

  public highlight(code: string, language: string, tabReplace: string = '   '): HighlightResult {
    if (!this.languageExists(language)) {
      throw new Error(`Language '${language}' does either not exist or has not been registered!`);
    }
    return hljs.highlight(this.replaceTabs(code, tabReplace), { language })
  }
}
