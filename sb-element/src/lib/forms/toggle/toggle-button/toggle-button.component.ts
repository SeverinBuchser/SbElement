import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SbToggleCore } from '../toggle-core';
import { Color, mixinAccent, mixinClassName, mixinColor, mixinSize, mixinTabindex, Size } from '../../../core';

const SbToggleButtonCore = mixinAccent(
  mixinTabindex(
    mixinSize(
      mixinColor(
        mixinClassName(
          SbToggleCore, 'sb-toggle-button'
        ), Color.PRIMARY
      ), Size.MEDIUM
    ), 0
  )
);

@Component({
  selector: 'sb-toggle[type=button]',
  templateUrl: './toggle-button.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.on]': 'toggled',
    '[class.off]': '!toggled',
    '[class.disabled]': 'disabled',
    '(click)': 'toggle()',
    '(focus)': 'setFocusedState(true)',
    '(blur)': 'setFocusedState(false)'
  },
  inputs: [
    'isAccent: accent',
    'size',
    'color',
    'disabled'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbToggleButtonComponent,
    multi: true
  }]
})
export class SbToggleButtonComponent extends SbToggleButtonCore {

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

}
