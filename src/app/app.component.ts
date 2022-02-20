import { Component } from '@angular/core';
import { SbThemeService } from "sb-element";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(themeService: SbThemeService) {
    themeService.commit('dark');
  }

}
