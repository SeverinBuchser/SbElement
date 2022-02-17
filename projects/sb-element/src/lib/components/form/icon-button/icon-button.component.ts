import { Attribute, Component, Input, Optional } from '@angular/core';
import { mixinDisable, Color, Size, mixinFocus } from '../../../core';

const SbIconButtonCore = mixinDisable(mixinFocus(class {}));


@Component({
  selector: 'sb-icon-button',
  templateUrl: './icon-button.component.html',
  inputs: [
    'disabled'
  ],
  outputs: [
    'focus',
    'blur'
  ],
})
export class IconButtonComponent extends SbIconButtonCore {

  @Input()
  public color: string = Color.PRIMARY;

  @Input()
  public size: string = Size.DEFAULT;

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

  public plain: boolean = false;
  public pill: boolean = false;
  public round: boolean = false;

  @Input()
  public icon: string = '';

  constructor(
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('round') round: any,
    @Optional() @Attribute('plain') plain: any,
  ) {
    super();
    if (pill == '') this.pill = true;
    if (round == '') this.round = true;
    if (plain == '') this.plain = true;
  }

}
