import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocService {

  constructor(private http: HttpClient) { }

  public get(module: string, doc: string): Observable<string> {
    return this.http.get(`/assets/example/${module}/${doc}.html`, {
      responseType: 'text'
    });
  }

  public replace(string: string, replacements: any): string {
    let docMatcher = new DocMatcher(string);
    docMatcher.setReplacements(replacements)
    return docMatcher.getReplaced();
  }
}

const fucntions = {
  removeLineOnEmpty: () => {

  }
}

export class DocMatcher {
  private replacerRegExp = /#<%= (.*?) %>/g;
  private matches: Array<RegExpMatchArray> = new Array();
  private docMatches: Array<DocMatch> = new Array();
  private lastSection!: DocSection;

  constructor(private docString: string) {
    this.match();
    this.buildSections();
  }

  private match(): void {
    let matches = this.docString.matchAll(this.replacerRegExp);
    for (let match of matches) {
      this.matches.push(match);
    }
  }

  private getSubstring(start: number, stop?: number): string {
    return this.docString.substring(start, stop)
  }

  private getLastEnd(matchIndex: number): number {
    let lastMatch = this.matches[matchIndex - 1];
    if (lastMatch && lastMatch.index) {
      return lastMatch.index + lastMatch[0].length;
    } else {
      return 0;
    }
  }

  private buildSections(): void {
    this.matches.forEach((match: RegExpMatchArray, matchIndex: number) => {
      if (match.index) {
        let docSection = new DocSection(this.getSubstring(
          this.getLastEnd(matchIndex),
          match.index
        ))
        this.docMatches.push(new DocMatch(docSection, match));
      }
    })
    this.lastSection = new DocSection(this.getSubstring(this.getLastEnd(this.matches.length)));
  }

  public setReplacements(replacements: any): void {
    this.docMatches.forEach((match: DocMatch) => {
      match.setReplacement(replacements);
    })
  }

  public getReplaced(): string {
    return this.docMatches.reduce((docString: string, docSection: DocMatch) => {
      return docString + docSection.get();
    }, '') + this.lastSection.get();
  }
}

export class DocSection {
  constructor(protected docString: string) {}

  public get(): string {
    return this.docString;
  }
}
export type DocFunction = (replacement: string) => string;
export type DocTypeFunction = (replacement: string, key: string) => string;

const replacementFunctions: Record<string, DocFunction> = {
  linerize: (replacement: string) => {
    if (replacement.length > 0) return '\n' + replacement;
    else return replacement;
  },
  tab: (replacement: string) => {
    if (replacement.length > 0) return '\t' + replacement;
    else return replacement;
  },
}

const typeFunction: Record<string, DocTypeFunction> = {
  none: (replacement: string) => replacement,
  attr: (replacement: string, key: string) => {
    if (replacement.length > 0) return `[${key}]="${replacement}"`;
    else return replacement;
  }
}

export class DocMatch {
  private static functionRegExp = /.*?\((.*)\)/;
  private replacement: string = 'asdf';
  private replacementFunctions: Array<DocFunction> = new Array();
  private typeFunction: DocTypeFunction = typeFunction.none;
  private replacementKey: string = '';

  constructor(private previousSection: DocSection, private match: RegExpMatchArray) {
    this.parse();
  }

  private parse(): void {
    let rest = this.match[1];

    while (rest.length > 0) {
      let match = rest.match(/(.*?)\((.*)\)/);

      if (match) {
        rest = match[2];
        let replacementFunction = replacementFunctions[match[1]];
        if (replacementFunction) {
          this.replacementFunctions.push(replacementFunction);
        }
      } else break;
    }
    let restMatch = rest.match(/(.*)\.(.*)/);
    if (restMatch) {
      this.typeFunction = typeFunction[restMatch[1]];
      this.replacementKey = restMatch[2];
    } else {
      this.replacementKey = rest;
    }
    this.replacementFunctions = [...this.replacementFunctions].reverse();
  }

  public setReplacement(replacements: any): DocMatch {
    this.replacement = replacements[this.replacementKey];
    this.replacement = this.replacement ? this.replacement : '';
    this.replacement = this.replacement.toString();
    return this;
  }

  public get(): string {
    return this.previousSection.get() + this.replacementFunctions.reduce((
      docString: string,
      fn: DocFunction
    ) => {
      return fn(docString);
    }, this.typeFunction(this.replacement, this.replacementKey));
  }
}
