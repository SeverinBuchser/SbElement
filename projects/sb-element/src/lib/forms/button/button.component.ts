import { Attribute, Component, ElementRef, Input, Optional, ViewEncapsulation } from '@angular/core';
import { SbThemeService, mixinSize, mixinColor, mixinClassName, mixinTheme, Color, Size } from '../../core';

const SbButtonCore = mixinSize(
  mixinColor(
    mixinTheme(
      mixinClassName(
        class {
          constructor(
            public _elementRef: ElementRef,
            public _themeService: SbThemeService) {}
        }, 'sb-button'
      )
    ), Color.PRIMARY
  ), Size.MEDIUM
);


@Component({
  selector: 'button, [sb-button]',
  templateUrl: './button.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.pill]': 'pill',
    '[class.plain]': 'plain',
    '[class.round]': 'round'
  },
  inputs: [
    'size',
    'color'
  ]
})
export class SbButtonComponent extends SbButtonCore {

  @Input()
  set isRound(isRound: boolean) {
    if (!this.pill) this.round = isRound;
    else if (isRound && this.pill) throw new Error('Cannot use pill and round'
      + ' attribute simultaneously!');
  }

  @Input()
  set isPill(isPill: boolean) {
    if (!this.round) this.pill = isPill;
    else if (isPill && this.round) throw new Error('Cannot use pill and round'
      + ' attribute simultaneously!');
  }

  @Input()
  set isPlain(isPlain: boolean) {
    this.plain = isPlain;
  }

  @Input()
  public type: string = 'button';

  private round: boolean = false;
  private pill: boolean = false;
  private plain: boolean = false;

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService,
    @Optional() @Attribute('round') isRound: any,
    @Optional() @Attribute('pill') isPill: any,
    @Optional() @Attribute('plain') isPlain: any
  ) {
    super(elementRef, themeService);
    if (isRound == '') this.isRound = true;
    if (isPill == '') this.isPill = true;
    if (isPlain == '') this.isPlain = true;
  }

}
