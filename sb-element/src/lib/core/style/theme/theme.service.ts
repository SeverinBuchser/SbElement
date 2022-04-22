import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from '@angular/core';
export class ThemesConfig extends Array<ThemeConfig> {}

export interface ThemeConfig {
  name: string;
  href: string;
}

@Injectable({
  providedIn: 'root'
})
export class SbThemeService {

  private _themeConfig: ThemeConfig = {
    name: '',
    href: ''
  };

  constructor(
    @Inject(ThemesConfig) private themesConfig: ThemesConfig,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.createLinkElement(themesConfig[0]).then(() => {
        this._themeConfig = themesConfig[0];
    })
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
    } else throw new Error(`Theme ${themeName} does not exist!`);
  }

  public get(): string {
    return this._themeConfig.name
  }

  private updateLinkElement(themeConfig: ThemeConfig): void {
    this.createLinkElement(themeConfig).then(() => {
        this.removeLinkElement(this._themeConfig);
        this._themeConfig = themeConfig;
    })
  }

  private createLinkElement(themeConfig: ThemeConfig): Promise<void> {
    const link = this.document.createElement('link');
    link.id = `sb-theme-${themeConfig.name}`;
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', themeConfig.href);
    this.document.head.appendChild(link);
    return new Promise<void>(resolve => {
      link.addEventListener('load', () => resolve())
    });
  }

  private removeLinkElement(themeConfig: ThemeConfig): void {
    const link: HTMLElement | null = this.document
      .getElementById(`sb-theme-${themeConfig.name}`);
    if (link) {
      this.document.head.removeChild(link);
    }
  }
}
