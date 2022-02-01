import { Component, ViewEncapsulation } from '@angular/core';
import { ClassNameInputDirective } from "../../../core";

@Component({
  selector: 'sb-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavBarComponent extends ClassNameInputDirective {
  public rootClass: string = 'sb-nav-bar';
}
