import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Color, mixinClassName, Size } from '../../core';
import { SbToggleCVACore } from '../toggle-cva-core';

const SbToggleButtonCore = mixinClassName(SbToggleCVACore, 'sb-toggle-button');

@Component({
  selector: 'sb-toggle[type=button]',
  templateUrl: './toggle-button.html',
  styleUrls: ['./toggle-button.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.on]': 'toggled',
    '[class.off]': '!toggled'
  },
  inputs: [
    'disabled'
  ],
  outputs: [
    'blur',
    'focus'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbToggleButtonComponent,
    multi: true
  }]
})
export class SbToggleButtonComponent extends SbToggleButtonCore {

  @Input()
  public color: string = Color.PRIMARY;

  @Input()
  public size: string = Size.MEDIUM;

  @Input()
  public accent: boolean | string = false;
  @Input()
  public pill: boolean | string = false;
  @Input()
  public round: boolean | string = false;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
