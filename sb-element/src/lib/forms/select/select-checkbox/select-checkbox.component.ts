import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SbSelectAllCore } from '../select-core';
import { CanClassName, CanDisable, CanFocus, HasElementRef, mixinAccent, mixinClassName, mixinColor, mixinPlain, mixinSize } from '../../../core';

const SbSelectCheckboxeCore = mixinAccent(
  mixinPlain(
    mixinSize(
      mixinColor(
        mixinClassName(
          SbSelectAllCore, 'sb-select-checkbox'
        )
      )
    )
  )
);

@Component({
  selector: 'sb-select[type=checkbox]',
  templateUrl: './select-checkbox.component.html',
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'isAccent: accent',
    'isPlain: plain',
    'size',
    'color',
    'disabled'
  ],
  outputs: [
    'focus',
    'blur'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbSelectCheckboxComponent,
    multi: true
  }]
})
export class SbSelectCheckboxComponent extends SbSelectCheckboxeCore<string>
  implements CanClassName, CanDisable, CanFocus, HasElementRef {

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
