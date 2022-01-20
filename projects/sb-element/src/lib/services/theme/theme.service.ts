import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

/**
  * A service which provides global access to the current theme.
  *
  * The service allows a component to get and set the theme. There are two
  * themes:
  * - `light`
  * - `dark`
  *
  * The default theme is the `dark` theme. The theme is stored in form of a
  * string, which is then included into classes of the different components or
  * elements.
  */
@Injectable({
  providedIn: 'root'
})
export class ThemeService extends BehaviorSubject<string> {
  /**
   * The current theme. The default theme is `dark`.
   */
  private _theme: string = 'dark';

  /**
   *
   */
  constructor() {
    super('dark');
  }

  /**
   * Sets the theme to the service.
   *
   * @param{string} theme The theme to commit
   */
  public commit(theme: string): void {
    if (theme == 'light' || theme == 'dark') {
      this._theme = theme;
      this.next(this._theme);
    } else throw new Error(`Theme ${theme} does not exist!`);
  }

  /**
   *  Gets the current theme.
   *
   * @returns{string} The current theme
   */
  public get(): string { return this._theme }

}
