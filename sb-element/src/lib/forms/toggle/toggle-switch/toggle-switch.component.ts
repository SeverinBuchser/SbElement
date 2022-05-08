import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SbToggleCVACore } from '../toggle-core';
import {
  Color,
  mixinAccent,
  mixinClassName,
  mixinColor,
  mixinSize,
  mixinTabindex,
  Size } from '../../../core';

const SbToggleSwitchCore = mixinAccent(
  mixinTabindex(
    mixinSize(
      mixinColor(
        mixinClassName(SbToggleCVACore, 'sb-toggle-switch'),
        Color.PRIMARY
      ),
      Size.MEDIUM
    ),
    0
  )
);

@Component({
  selector: 'sb-toggle[type=switch]',
  templateUrl: './toggle-switch.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.on]': 'toggled',
    '[class.off]': '!toggled',
    '[class.disabled]': 'disabled',
    '(click)': 'toggle()'
  },
  inputs: [
    'isAccent: accent',
    'size',
    'color',
    'disabled'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbToggleSwitchComponent,
    multi: true
  }]
})
export class SbToggleSwitchComponent extends SbToggleSwitchCore {

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
