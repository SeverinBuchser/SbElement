import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Color, mixinDisable, mixinFocus, Size } from '../core';

/** @internal */
const SbIconButtonCore = mixinDisable(mixinFocus(class {}));

@Component({
  selector: 'sb-icon-button',
  templateUrl: './icon-button.component.html',
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'disabled'
  ],
  outputs: [
    'blur',
    'focus'
  ],
})
export class SbIconButtonComponent extends SbIconButtonCore {

  @Input()
  public color: string | undefined = Color.PRIMARY;

  @Input()
  public size: string | undefined = Size.MEDIUM;

  @Input()
  public accent: boolean | string = false;
  @Input()
  public pill: boolean | string = false;
  @Input()
  public plain: boolean | string = false;
  @Input()
  public round: boolean | string = false;

  @Input()
  public type: string = 'button';

  @Input()
  public icon: string = '';

}
