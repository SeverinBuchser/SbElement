import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { mixinSize, mixinClassName, mixinTheme, ThemeService, Size } from "../../core";


const SbLinkCore = mixinSize(
  mixinTheme(
    mixinClassName(
      class {
        constructor(
          public _elementRef: ElementRef,
          public _themeService: ThemeService) {}
      }, 'sb-link'
    )
  ), Size.DEFAULT
);

@Component({
  selector: 'sb-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
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
    themeService: ThemeService
  ) {
    super(elementRef, themeService);
  }

}
