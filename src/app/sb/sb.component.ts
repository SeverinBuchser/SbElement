import { Component, ElementRef } from '@angular/core';
import { mixinClassName, mixinTheme, SbThemeService } from "sb-element";

@Component({
  selector: 'sb',
  templateUrl: './sb.component.html',
  styleUrls: ['./sb.component.scss']
})
export class SBComponent  extends
mixinTheme(
  mixinClassName(
    class {
      constructor(
        public _elementRef: ElementRef,
        public _themeService: SbThemeService) {}
    }, 'home-logo'
  )
) {

}
