import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

export class ThemesConfig extends Array<ThemeConfig> {}

export interface ThemeConfig {
  name: string;
  href: string;
}

@Injectable({
  providedIn: 'root'
})
export class SbThemeService extends BehaviorSubject<string> {

  private _themeConfig!: ThemeConfig;

  constructor(
    @Inject(ThemesConfig) private themesConfig: ThemesConfig,
    @Inject(DOCUMENT) private document: Document
  ) {
    super('dark');
    this.createNewLinkElement(themesConfig[0])
  }

  private findThemeByName(themeName: string) {
    return (themeConfig: ThemeConfig): boolean => {
      return themeName == themeConfig.name;
    }
  }

  public commit(themeName: string): void {
    const themeConfig = this.themesConfig.find(this.findThemeByName(themeName));
    if (themeConfig) {
      this.updateLinkElement(themeConfig);
      this.next(this._themeConfig.name);
    } else throw new Error(`Theme ${themeName} does not exist!`);
  }

  public get(): string { return this._themeConfig.name }

  private createNewLinkElement(themeConfig: ThemeConfig): void {
    this.createLinkElement(themeConfig);
    this._themeConfig = themeConfig;
  }

  private updateLinkElement(themeConfig: ThemeConfig): void {
    this.removeLinkElement(this._themeConfig);
    this.createNewLinkElement(themeConfig);
  }

  private createLinkElement(themeConfig: ThemeConfig) {
    const link = this.document.createElement('link');
    link.id = `sb-theme-${themeConfig.name}`;
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', themeConfig.href);
    this.document.head.appendChild(link);
  }

  private removeLinkElement(themeConfig: ThemeConfig): void {
    const link: HTMLElement | null = this.document.getElementById(`sb-theme-${themeConfig.name}`);
    if (link) {
      this.document.head.removeChild(link);
    }
  }
}
