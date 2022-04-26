import { Directive, ElementRef } from '@angular/core';
import { SbAlignDirective } from './align.directive';
import { Position } from './position';
import { HasElementRef } from '../common-behaviors';

const defaultOptions = {
  marginSide: {
    dx: 0,
    dy: 0
  },
  marginAlignment: {
    dx: 0,
    dy: 0
  },
  minAlignment: {
    dx: 0,
    dy: 0
  },
  maxAlignment: {
    dx: Number.MAX_VALUE,
    dy: Number.MAX_VALUE
  }
}

interface AlignRelativeOptions {
  marginSide: Delta;
  marginAlignment: Delta;
  minAlignment: Delta;
  maxAlignment: Delta;
}

interface Delta {
  dx: number;
  dy: number;
}

export interface Alignment {
  centerAlignment: Delta;
  offsetAlignment: Delta;
}

@Directive({
  selector: '[sbAlignRelative]'
})
export class SbAlignRelateiveDirective extends SbAlignDirective implements HasElementRef {

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public getCenterAlignment(relativeBBox: DOMRect): Delta {
    let { height, width } = this.boundingClientRect;
    return {
      dx: relativeBBox.width / 2 - width / 2,
      dy: relativeBBox.height / 2 - height / 2
    }
  }

  private alignment(
    availableSpace: number,
    position: Position,
    minAlignment: number,
    maxAlignment: number
  ): number {
    let d = availableSpace * position.sideAlignment;
    let sign = Math.sign(d);
    d = Math.abs(d);
    d = Math.max(d, minAlignment);
    d = Math.min(d, maxAlignment);
    return d * sign;
  }

  private offset(
    relativeDimension: number,
    dimension: number,
    availableSpace: number,
    position: Position,
    minAlignment: number,
    maxAlignment: number,
    marginSide: number
  ): { alignment: number, side: number } {
    let alignment = this.alignment(
      availableSpace,
      position,
      minAlignment,
      maxAlignment
    );

    let side: number;

    if (position.isNegativeSide) {
      side = - (relativeDimension / 2 + dimension / 2 + marginSide);
    } else {
      side = relativeDimension / 2 + dimension / 2 + marginSide;
    }

    return { alignment, side };
  }

  public getOffsetAlignment(
    relativeBBox: DOMRect,
    position: Position,
    options?: Partial<AlignRelativeOptions>
  ): Delta {
    let completeOptions = Object.assign({}, defaultOptions, options);
    let { height, width } = this.boundingClientRect;


    let dx = 0;
    let dy = 0;

    if (position.isTop || position.isBottom) {
      let availableSpaceX = (relativeBBox.width - width) / 2 - completeOptions.marginAlignment.dx;
      let offset = this.offset(
        relativeBBox.height,
        height,
        availableSpaceX,
        position,
        completeOptions.minAlignment.dx,
        completeOptions.maxAlignment.dx,
        completeOptions.marginSide.dy
      );
      dx = offset.alignment;
      dy = offset.side;
    }

    if (position.isLeft || position.isRight) {
      let availableSpaceY = (relativeBBox.height - height) / 2 - completeOptions.marginAlignment.dy;
      let offset = this.offset(
        relativeBBox.width,
        width,
        availableSpaceY,
        position,
        completeOptions.minAlignment.dy,
        completeOptions.maxAlignment.dy,
        completeOptions.marginSide.dx
      );
      dx = offset.side;
      dy = offset.alignment;
    }

    return { dx, dy }
  }

  public alignRelative(
    relativeBBox: DOMRect,
    position: Position,
    options?: Partial<AlignRelativeOptions>
  ): Alignment {
    let centerAlignment = this.getCenterAlignment(relativeBBox);
    let offsetAlignment = this.getOffsetAlignment(relativeBBox, position, options);
    this.moveBy(
      centerAlignment.dx + offsetAlignment.dx,
      centerAlignment.dy + offsetAlignment.dy
    );
    return { centerAlignment, offsetAlignment }
  }

}
