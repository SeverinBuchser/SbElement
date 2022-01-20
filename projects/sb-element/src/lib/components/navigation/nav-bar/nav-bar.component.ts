import { Component } from '@angular/core';
import { SizeThemeInputDirective } from "../../../core";

@Component({
  selector: 'sb-el-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent extends SizeThemeInputDirective {
  public rootClass: string = 'sb-el-nav-bar';
}
