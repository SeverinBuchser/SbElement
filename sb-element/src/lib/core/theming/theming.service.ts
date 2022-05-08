import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, Optional } from '@angular/core';
import {
  SbThemeConfig,
  SbThemingModuleConfig,
  SB_THEMING_CONFIG } from "./theming.module.config";

@Injectable({
  providedIn: 'root'
})
export class SbThemingService {

  private _themeConfig: SbThemeConfig = {
    name: '',
    href: ''
  };

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Optional() @Inject(SB_THEMING_CONFIG) private config?: SbThemingModuleConfig,
  ) {
    if (config) {
      this.createLinkElement(config[0]).then(() => {
          this._themeConfig = config[0];
      })
    }
  }

  private checkConfigured(): void {
    if (!this.config) {
      throw new Error("The SbThemingModule has not been configured!");
    }
  }

  private findThemeByName(themeName: string) {
    return (themeConfig: SbThemeConfig): boolean => {
      return themeName == themeConfig.name;
    }
  }

  public commit(themeName: string): void {
    this.checkConfigured();
    const themeConfig = this.config!.find(this.findThemeByName(themeName));
    if (themeConfig) {
      this.updateLinkElement(themeConfig);
    } else throw new Error(`Theme ${themeName} does not exist!`);
  }

  public get(): string {
    this.checkConfigured();
    return this._themeConfig.name
  }

  private updateLinkElement(themeConfig: SbThemeConfig): void {
    this.createLinkElement(themeConfig).then(() => {
        this.removeLinkElement(this._themeConfig);
        this._themeConfig = themeConfig;
    })
  }

  private createLinkElement(themeConfig: SbThemeConfig): Promise<void> {
    const link = this.document.createElement('link');
    link.id = `sb-theme-${themeConfig.name}`;
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', themeConfig.href);
    this.document.head.appendChild(link);
    return new Promise<void>(resolve => {
      link.addEventListener('load', () => resolve())
    });
  }

  private removeLinkElement(themeConfig: SbThemeConfig): void {
    const link: HTMLElement | null = this.document
      .getElementById(`sb-theme-${themeConfig.name}`);
    if (link) {
      this.document.head.removeChild(link);
    }
  }
}
