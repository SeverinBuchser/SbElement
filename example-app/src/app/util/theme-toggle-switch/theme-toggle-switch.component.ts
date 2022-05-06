import { Component, ViewEncapsulation } from '@angular/core';
import { SbThemingService } from 'sb-element';

@Component({
  selector: 'theme-toggle-switch',
  templateUrl: './theme-toggle-switch.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ThemeToggleSwitchComponent {

  get toggle(): boolean {
    return this.themingService.get() == 'dark';
  }

  set toggle(isToggled: boolean) {
    if (this.themingService.get() == 'dark') {
      this.themingService.commit('light');
    } else {
      this.themingService.commit('dark');
    }
  }

  constructor(private themingService: SbThemingService) { }

}
