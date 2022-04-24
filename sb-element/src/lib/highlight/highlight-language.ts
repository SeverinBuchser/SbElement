import { LanguageFn } from "highlight.js";

export interface SbHighlightLanguage {
	name: string;
	languageFn: LanguageFn;
}
