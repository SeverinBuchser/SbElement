import { Attribute, Component, ElementRef, Input, Optional, ViewEncapsulation } from '@angular/core';
import { SbThemeService, mixinSize, mixinColor, mixinClassName } from '../../core';

const SbAlertBoxCore = mixinSize(
  mixinColor(
    mixinClassName(
      class {
        constructor(
          public _elementRef: ElementRef,
          public _themeService: SbThemeService) {}
      }, 'sb-alert-box'
    )
  )
);

@Component({
  selector: 'sb-alert-box',
  templateUrl: './alert-box.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.pill]': 'pill',
    '[class.plain]': 'plain',
    '[class.center]': '!showArrow && !showIcon'
  },
  inputs: [
    'size',
    'color'
  ]
})
export class SbAlertBoxComponent extends SbAlertBoxCore {

  @Input()
  public showArrow: boolean = true;

  @Input()
  public showIcon: boolean = true;

  @Input()
  public customIcon: boolean = false;

  private pill: boolean = false;
  private plain: boolean = false;

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService,
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('plain') plain: any,
  ) {
    super(elementRef, themeService);
    if (pill == '') this.pill = true;
    if (plain == '') this.plain = true;
  }

}
