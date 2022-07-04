import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import {
  Color,
  hasElementRefClass,
  mixinAccent,
  mixinClassName,
  mixinColor,
  mixinPill,
  mixinPlain,
  mixinRound,
  mixinSize,
  Size
} from '../core';

/** @internal */
const SbButtonCore = mixinAccent(
  mixinPill(
    mixinPlain(
      mixinRound(
        mixinSize(
          mixinColor(
            mixinClassName(hasElementRefClass, 'sb-button'),
            Color.PRIMARY
          ),
          Size.MEDIUM
        )
      )
    )
  )
);


@Component({
  selector: 'button, [sb-button]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./button.component.scss'],
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
