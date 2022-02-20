import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { mixinClassName, mixinTheme, SbThemeService } from '../../core';

const SbContainerCore = mixinTheme(
  mixinClassName(
    class {
      constructor(
        public _elementRef: ElementRef,
        public _themeService: SbThemeService) {}
    }, 'sb-container'
  )
);

@Component({
  selector: 'sb-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SbContainerComponent extends SbContainerCore {

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService
  ) {
    super(elementRef, themeService);
  }

}
