import { Injectable } from '@angular/core';

/**
  * A service which provides global access to the current theme.
  *
  * The service allows a component to get and set the theme. There are two
  * themes:
  * - `light`
  * - `night`
  *
  * The default theme is the `night` theme. The theme is stored in form of a
  * string, which is then included into classes of the different components or
  * elements.
  */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  /**
   * The current theme. The default theme is `night`.
   */
  private _theme: string = 'night';

  /**
   * Sets the theme to the service.
   *
   * @param{string} theme The theme to commit
   */
  public commit(theme: string): void { this._theme = theme }

  /**
   *  Gets the current theme.
   *
   * @returns{string} The current theme
   */
  public get(): string { return this._theme }

}
