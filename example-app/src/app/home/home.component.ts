import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { Color, mixinClassName, mixinColor, SbThemeService } from "sb-element";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent extends mixinColor(mixinClassName(class {
  constructor(
    public _elementRef: ElementRef,
    public _themeService: SbThemeService) {}
}, 'home'), Color.PRIMARY) {

  public toggle: boolean = false;

  constructor(
    themeService: SbThemeService,
    elementRef: ElementRef,
    public router: Router
  ) {
    super(elementRef, themeService);
    this._themeService.commit('dark');
  }

  public toggleTheme() {
    if (this._themeService.get() == 'dark') {
      this._themeService.commit('light');
    } else {
      this._themeService.commit('dark');
    }
  }
}
