import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { mixinSize, mixinColor, mixinClassName, Color, Size, mixinAccent, mixinPlain, mixinDisable, mixinTabindex } from '../../../../core';

const SbSelectListCore = mixinTabindex(
  mixinDisable(
    mixinAccent(
      mixinPlain(
        mixinSize(
          mixinColor(
            mixinClassName(
              class {
                constructor(public _elementRef: ElementRef) {}
              }, 'sb-select-list'
            ), Color.PRIMARY
          ), Size.MEDIUM
        )
      )
    )
  ), 0
);

@Component({
  selector: 'sb-select-list',
  templateUrl: './select-list.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.align-right]': 'align == "right"',
    '[class.align-left]': 'align == "left"',
    '[class.align-center]': 'align == "center"'
  },
  inputs: [
    'isAccent: accent',
    'isPlain: plain',
    'size',
    'color',
    'disabled'
  ]
})
export class SbSelectListComponent extends SbSelectListCore {

  @Input()
  public options: Array<string> = new Array<string>();

  @Input()
  public align: 'right' | 'left' | 'center' = 'center';

  @Output()
  public select: EventEmitter<string> = new EventEmitter();

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
