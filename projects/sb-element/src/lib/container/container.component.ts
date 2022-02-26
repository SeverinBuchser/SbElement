import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { mixinClassName, SbThemeService } from '../core';

const SbContainerCore = mixinClassName(
  class {
    constructor(
      public _elementRef: ElementRef,
      public _themeService: SbThemeService) {}
  }, 'sb-container'
);

@Component({
  selector: 'sb-container',
  templateUrl: './container.component.html',
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
