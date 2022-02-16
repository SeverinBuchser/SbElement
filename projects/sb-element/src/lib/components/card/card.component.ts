import { Attribute, Component, ElementRef, Input, Optional, ViewEncapsulation } from '@angular/core';
import { ThemeService, mixinClassName, mixinSize, mixinTheme, Size } from '../../core';

const SbCardCore = mixinSize(
  mixinTheme(
    mixinClassName(
      class {
        constructor(
          public _elementRef: ElementRef,
          public _themeService: ThemeService) {}
      }, 'sb-card'
    )
  ), Size.DEFAULT
);

@Component({
  selector: 'sb-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.hover]': 'hover',
    '[class.shadow]': 'shadow'
  },
  inputs: [
    'size'
  ]
})
export class SbCardComponent extends SbCardCore {

  @Input()
  public titleSeparator: boolean = true;

  @Input()
  public footerSeprator: boolean = true;

  private hover: boolean = false;
  private shadow: boolean = false;

  constructor(
    elementRef: ElementRef,
    themeService: ThemeService,
    @Optional() @Attribute('hover') hover: any,
    @Optional() @Attribute('shadow') shadow: any
  ) {
    super(elementRef, themeService);
    if (hover == '') this.hover = true;
    if (shadow == '') this.shadow = true;
  }

}
