import { Attribute, Component, ElementRef, Input, Optional, ViewEncapsulation } from '@angular/core';
import { SbThemeService, mixinSize, mixinTheme, mixinClassName, mixinColor } from '../../core';

const SbIconCore = mixinSize(
  mixinColor(
    mixinTheme(
      mixinClassName(
        class {
          constructor(
            public _elementRef: ElementRef,
            public _themeService: SbThemeService) {}
        }, 'sb-icon'
      )
    )
  )
);


@Component({
  selector: 'sb-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.outline]': 'outline'
  },
  inputs: [
    'size',
    'color'
  ]
})
export class SbIconComponent extends SbIconCore {

  @Input()
  public icon: string = '';

  @Input()
  set isOutline(isOutline: boolean) {
    this.outline = isOutline;
  }

  private outline: boolean = false;

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService,
    @Optional() @Attribute('outline') outline: any
  ) {
    super(elementRef, themeService);
    if (outline == '') this.isOutline = true;
  }

}
