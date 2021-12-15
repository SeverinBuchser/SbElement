import { Component } from '@angular/core';
import { ThemeService } from "sb-element";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(themeService: ThemeService) {
    themeService.commit('dark');
  }

}
