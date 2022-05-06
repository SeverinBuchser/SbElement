import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SbToggleCVACore } from '../toggle-core';
import { Color, mixinAccent, mixinClassName, mixinColor } from '../../../core';

const SbToggleCheckboxCore = mixinAccent(
  mixinColor(
    mixinClassName(
      SbToggleCVACore, 'sb-toggle-checkbox'
    ), Color.PRIMARY
  )
);

@Component({
  selector: 'sb-toggle[type=checkbox]',
  templateUrl: './toggle-checkbox.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.disabled]': 'disabled'
  },
  inputs: [
    'isAccent: accent',
    'color',
    'disabled'
  ],
  outputs: [
    'focus',
    'blur'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbToggleCheckboxComponent,
    multi: true
  }]
})
export class SbToggleCheckboxComponent extends SbToggleCheckboxCore {

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}