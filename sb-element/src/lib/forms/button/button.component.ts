import { Attribute, Component, ElementRef, Input, Optional, ViewEncapsulation } from '@angular/core';
import { mixinSize, mixinColor, mixinClassName, Color, Size } from '../../core';

const SbButtonCore = mixinSize(
  mixinColor(
    mixinClassName(
      class {
        constructor(public _elementRef: ElementRef) {}
      }, 'sb-button'
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
    '[class.round]': 'round',
    '[class.accent]': 'accent'
  },
  inputs: [
    'size',
    'color'
  ]
})
export class SbButtonComponent extends SbButtonCore {

  @Input('round')
  set isRound(isRound: boolean | string) {
    if (!this.pill) {
      if (typeof isRound == 'string') this.round = true;
      else this.round = isRound;
    } else if ((isRound == '' || isRound) && this.pill) throw new Error('Cannot use pill and round'
      + ' attribute simultaneously!');
  }

  @Input('pill')
  set isPill(isPill: boolean | string) {
    if (!this.round) {
      if (typeof isPill == 'string') this.pill = true;
      else this.pill = isPill;
    } else if ((isPill == '' || isPill) && this.round) throw new Error('Cannot use pill and round'
      + ' attribute simultaneously!');
  }

  @Input('plain')
  set isPlain(isPlain: boolean | string) {
    if (typeof isPlain == 'string') this.plain = true;
    else this.plain = isPlain;
  }

  @Input('accent')
  set isAccent(isAccent: boolean | string) {
    if (typeof isAccent == 'string') this.accent = true;
    else this.accent = isAccent;
  }

  @Input()
  public type: string = 'button';

  public round: boolean = false;
  public pill: boolean = false;
  public plain: boolean = false;
  public accent: boolean = false;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
