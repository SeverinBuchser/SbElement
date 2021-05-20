import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _theme: string = 'night';
  public commit(theme: string) { this._theme = theme }
  public get(): string { return this._theme }

}
