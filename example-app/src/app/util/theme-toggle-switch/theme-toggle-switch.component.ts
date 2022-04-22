import { Component, ViewEncapsulation } from '@angular/core';
import { SbThemeService } from 'sb-element';

@Component({
  selector: 'theme-toggle-switch',
  templateUrl: './theme-toggle-switch.component.html',
  styleUrls: ['./theme-toggle-switch.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ThemeToggleSwitchComponent {

  get toggle(): boolean {
    return this.themeService.get() == 'dark';
  }

  set toggle(isToggled: boolean) {
    if (this.themeService.get() == 'dark') {
      this.themeService.commit('light');
    } else {
      this.themeService.commit('dark');
    }
  }

  constructor(private themeService: SbThemeService) { }

}
