import { Component } from '@angular/core';
import { ThemeInputDirective } from "sb-element";

@Component({
  selector: 'sb',
  templateUrl: './sb.component.html',
  styleUrls: ['./sb.component.scss']
})
export class SBComponent extends ThemeInputDirective {

  public rootClass: string = 'home-logo';

}
