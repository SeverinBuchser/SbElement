import { Component, Input } from '@angular/core';
import { mixinDisable, Color, Size, mixinFocus } from '../../core';

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
export class SbIconButtonComponent extends SbIconButtonCore {

  @Input()
  public color: string = Color.PRIMARY;

  @Input()
  public size: string = Size.MEDIUM;

  @Input('accent')
  public isAccent: boolean | string = false;
  @Input('pill')
  public isPill: boolean | string = false;
  @Input('plain')
  public isPlain: boolean | string = false;
  @Input('round')
  public isRound: boolean | string = false;

  @Input()
  public type: string = 'button';

  @Input()
  public icon: string = '';

}
