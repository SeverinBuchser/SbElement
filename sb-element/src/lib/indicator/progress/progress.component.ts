import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { Color, mixinClassName, mixinColor, mixinDisable, mixinPill, mixinSize, Size } from "../../core";

const SbProgressCore = mixinPill(
  mixinDisable(
    mixinSize(
      mixinColor(
        mixinClassName(
          class {
            constructor(public _elementRef: ElementRef) {}
          }, 'sb-progress'
        ), Color.PRIMARY
      ), Size.MEDIUM
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

  @Input('outline')
  set isOutline(isOutline: boolean | string) {
    if (typeof isOutline == 'string') this.outline = true;
    else this.outline = isOutline;
  }

  @Input('striped')
  set isStriped(isStriped: boolean | string) {
    if (typeof isStriped == 'string') this.striped = true;
    else this.striped = isStriped;
  }

  public outline: boolean = false;
  public striped: boolean = false;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
