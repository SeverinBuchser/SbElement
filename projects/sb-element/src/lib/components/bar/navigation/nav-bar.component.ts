import { Component } from '@angular/core';
import { ClassNameInputDirective } from "../../../core";

@Component({
  selector: 'sb-el-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent extends ClassNameInputDirective {
  public rootClass: string = 'sb-el-nav-bar';
}
