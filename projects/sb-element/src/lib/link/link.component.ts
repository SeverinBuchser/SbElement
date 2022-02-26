import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { mixinSize, mixinClassName, mixinTheme, SbThemeService, Size } from "../core";


const SbLinkCore = mixinSize(
  mixinTheme(
    mixinClassName(
      class {
        constructor(
          public _elementRef: ElementRef,
          public _themeService: SbThemeService) {}
      }, 'sb-link'
    )
  ), Size.MEDIUM
);

@Component({
  selector: 'sb-link',
  templateUrl: './link.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.active]': 'active'
  },
  inputs: [
    'size'
  ]
})
export class SbLinkComponent extends SbLinkCore {

  @Input()
  public active: boolean = false;

  @Input()
  public href: string = '';

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService
  ) {
    super(elementRef, themeService);
  }

}
