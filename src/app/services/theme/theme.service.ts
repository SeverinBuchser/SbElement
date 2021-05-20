import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _theme: string = 'light';
  get theme(): string { return this._theme }
  public commit(theme: string) { this._theme = theme }
  
}
