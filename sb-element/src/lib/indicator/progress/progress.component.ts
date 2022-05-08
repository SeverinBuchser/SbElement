import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import {
  Color,
  hasElementRefClass,
  mixinClassName,
  mixinColor,
  mixinDisable,
  mixinPill,
  mixinSize,
  Size } from "../../core";

const SbProgressCore = mixinPill(
  mixinDisable(
    mixinSize(
      mixinColor(
        mixinClassName(hasElementRefClass, 'sb-progress'),
        Color.PRIMARY
      ),
      Size.MEDIUM
    )
  )
);

@Component({
  selector: 'sb-progress',
  templateUrl: './progress.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.outline]': 'outline',
    '[class.striped]': 'striped && size != "xs"',
    '[class.animate-stripes]': 'animateStripes && striped'
  },
  inputs: [
    'isPill: pill',
    'size',
    'color',
    'disabled'
  ]
})
export class SbProgressComponent extends SbProgressCore {

  @Input()
  public progress: number = 0;

  @Input()
  public transition: string = '';

  get progressPercentage(): string {
    return `${this.progress}%`;
  }

  @Input()
  public showPercentage: boolean = false;

  @Input()
  public animateStripes: boolean = false;

  private _outline: boolean = false;

  get outline(): boolean {
    return this._outline;
  }

  @Input('outline')
  set isOutline(isOutline: boolean | string) {
    if (typeof isOutline == 'string') this._outline = true;
    else this._outline = isOutline;
  }

  private _striped: boolean = false;
  
  get striped(): boolean {
    return this._striped;
  }

  @Input('striped')
  set isStriped(isStriped: boolean | string) {
    if (typeof isStriped == 'string') this._striped = true;
    else this._striped = isStriped;
  }

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
