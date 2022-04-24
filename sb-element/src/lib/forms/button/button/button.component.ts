import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { mixinSize, mixinColor, mixinClassName, Color, Size, mixinPill, mixinRound, mixinPlain, mixinAccent } from '../../../core';

const SbButtonCore = mixinAccent(
  mixinPill(
    mixinPlain(
      mixinRound(
        mixinSize(
          mixinColor(
            mixinClassName(
              class {
                constructor(public _elementRef: ElementRef) {}
              }, 'sb-button'
            ), Color.PRIMARY
          ), Size.MEDIUM
        )
      )
    )
  )
);


@Component({
  selector: 'button, [sb-button]',
  templateUrl: './button.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.type]': 'type'
  },
  inputs: [
    'isAccent: accent',
    'isPill: pill',
    'isPlain: plain',
    'isRound: round',
    'size',
    'color'
  ]
})
export class SbButtonComponent extends SbButtonCore {

  @Input()
  public type: string = 'button';

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
