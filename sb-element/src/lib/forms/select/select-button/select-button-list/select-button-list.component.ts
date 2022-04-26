import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Color, mixinAccent, mixinClassName, mixinColor, mixinDisable, mixinTabindex, mixinHide, mixinPlain, mixinSize, Size, Triggerable } from '../../../../core';

const SbSelectButtonListCore = mixinHide(
  mixinDisable(
    mixinTabindex(
      mixinAccent(
        mixinPlain(
          mixinSize(
            mixinColor(
              mixinClassName(
                class {
                  constructor(public _elementRef: ElementRef) {}
                }, 'sb-select-button-list'
              ), Color.PRIMARY
            ), Size.MEDIUM
          )
        )
      ), 0
    )
  ), false
);

@Component({
  selector: 'sb-select-button-list',
  templateUrl: './select-button-list.component.html',
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'isAccent: accent',
    'isPlain: plain',
    'size',
    'color',
    'disabled'
  ]
})
export class SbSelectButtonListComponent extends SbSelectButtonListCore implements Triggerable {

  @Input()
  public options: Array<string> = new Array();

  @Output()
  public select: EventEmitter<string> = new EventEmitter();

  constructor(elementRef: ElementRef) {
    super(elementRef);
    this.transitionElement = this._elementRef;
  }

  public trigger(): void {
    this.visible = !this.visible;
  }

}
