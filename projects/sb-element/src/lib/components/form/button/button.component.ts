import { Attribute, Component, ElementRef, Input, Optional, ViewEncapsulation } from '@angular/core';
import { ThemeService, mixinSize, mixinColor, mixinClassName, mixinTheme, Color, Size } from '../../../core';

const SbButtonCore = mixinSize(
  mixinColor(
    mixinTheme(
      mixinClassName(
        class {
          constructor(
            public _elementRef: ElementRef,
            public _themeService: ThemeService) {}
        }, 'sb-button'
      )
    ), Color.PRIMARY
  ), Size.DEFAULT
);


@Component({
  selector: 'button, [sb-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
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
    themeService: ThemeService,
    @Optional() @Attribute('round') round: any,
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('plain') plain: any
  ) {
    super(elementRef, themeService);
    if (round == '') this.isRound = true;
    if (pill == '') this.isPill = true;
    if (plain == '') this.isPlain = true;
  }

}
