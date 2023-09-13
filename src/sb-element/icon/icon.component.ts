import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName, mixinColor, mixinSize } from '../core';

const SbIconCore = mixinSize(
  mixinColor(
    mixinClassName(hasElementRefClass, 'sb-icon')
  )
);


@Component({
  selector: 'sb-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.outline]': 'outline'
  },
  inputs: [
    'size',
    'color'
  ]
})
export class SbIconComponent extends SbIconCore {

  @Input()
  public icon: string = '';

  private _outline: boolean = false;

  get outline(): boolean {
    return this._outline
  }

  @Input('outline')
  set isOutline(isOutline: boolean | string) {
    if (typeof isOutline == 'string') this._outline = true;
    else this._outline = isOutline;
  }

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}