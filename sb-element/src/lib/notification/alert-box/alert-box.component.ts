import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import {
  hasElementRefClass,
  mixinClassName,
  mixinColor,
  mixinPill,
  mixinPlain,
  mixinSize,
  Size } from '../../core';

const SbAlertBoxCore = mixinPill(
  mixinPlain(
    mixinSize(
      mixinColor(
        mixinClassName(hasElementRefClass, 'sb-alert-box')
      ),
      Size.MEDIUM
    )
  )
);

@Component({
  selector: 'sb-alert-box',
  templateUrl: './alert-box.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.only-arrow]': 'arrow && !icon',
    '[class.only-icon]': '!arrow && icon',
    '[class.no-icon]': '!arrow && !icon',
  },
  inputs: [
    'isPill: pill',
    'isPlain: plain',
    'size',
    'color'
  ]
})
export class SbAlertBoxComponent extends SbAlertBoxCore {

  @Input()
  public message: string = '';

  @Input()
  public arrow: boolean = true;

  @Input()
  public icon: boolean = true;

  @Input()
  public customIcon: boolean = false;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
