import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { SbSelectCore } from '../../select-core';
import { CanClassName, CanDisable, CanFocus, HasElementRef, mixinAccent, mixinClassName, mixinColor, mixinPlain, mixinSize } from '../../../../core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SbSelectButtonListComponent } from '../select-button-list';

const SbSelectButtonCore = mixinAccent(
  mixinPlain(
    mixinSize(
      mixinColor(
        mixinClassName(
          SbSelectCore, 'sb-select-button'
        )
      )
    )
  )
);

@Component({
  selector: 'sb-select-button',
  templateUrl: './select-button.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.open]': 'open'
  },
  inputs: [
    'isAccent: accent',
    'isPlain: plain',
    'size',
    'color',
    'disabled',
    'options'
  ],
  outputs: [
    'focus',
    'blur'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SelectButtonComponent,
    multi: true
  }]
})
export class SelectButtonComponent extends SbSelectButtonCore<string>
  implements CanClassName, CanDisable, CanFocus, ControlValueAccessor, HasElementRef {

  @ViewChild(SbSelectButtonListComponent)
  public list!: SbSelectButtonListComponent;

  @Input()
  public placeholder: string = '';

  get open(): boolean {
    return this.list ? this.list.visible : false;
  }

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public select(option: string): void {
    super.select(option);
    this.list.trigger();
  }


}