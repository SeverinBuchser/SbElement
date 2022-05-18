import { ElementRef } from "@angular/core";
import { SbDimensions } from "./dimensions";
import { SbDimensionsOverlapOverflow } from './overflow';

export class SbDimensionsOverlap {

	get isInside(): boolean {
    return this.isVerticallyInside && this.isHorizontallyInside;
	}

	get isClipping(): boolean {
		return this.isHorizontallyClipping && this.isVerticallyClipping
      || this.isHorizontallyClipping && this.isVerticallyInside
      || this.isHorizontallyInside && this.isVerticallyClipping
	}

	get isOutside(): boolean {
		return this.isHorizontallyOutside || this.isVerticallyOutside;
	}

  get isHorizontallyOutside(): boolean {
    return this.leftToLeft > 0 && this.rightToLeft >= 0
      || this.leftToRight <= 0 && this.rightToRight < 0;
  }

  get isHorizontallyClipping(): boolean {
    return this.leftToLeft > 0 && this.rightToLeft < 0
      || this.leftToRight > 0 && this.rightToRight < 0;
  }

  get horizontalOverflow(): SbDimensionsOverlapOverflow | undefined {
    if (this.isHorizontallyClipping || this.isHorizontallyOutside) {
      if (this.leftToLeft > 0 && this.rightToRight >= 0) {
        return {
          distance: this.leftToLeft,
          side: 'left',
          direction: 'horizontal'
        };
      } else if (this.leftToLeft <= 0 && this.rightToRight < 0) {
        return {
          distance: this.rightToRight,
          side: 'right',
          direction: 'horizontal'
        };
      }
    }
    return;
  }

  get isHorizontallyInside(): boolean {
    return this.leftToLeft <= 0 && this.rightToRight >= 0;
  }


  get isVerticallyOutside(): boolean {
    return this.topToTop > 0 && this.bottomToTop >= 0
      || this.topToBottom <= 0 && this.bottomToBottom < 0;
  }

  get isVerticallyClipping(): boolean {
    return this.topToTop > 0 && this.bottomToTop < 0
      || this.topToBottom > 0 && this.bottomToBottom < 0;
  }

  get verticalOverflow(): SbDimensionsOverlapOverflow | undefined {
    if (this.isVerticallyClipping || this.isVerticallyOutside) {
      if (this.topToTop > 0 && this.bottomToBottom >= 0) {
        return {
          distance: this.topToTop,
          side: 'top',
          direction: 'vertical'
        };
      } else if (this.topToTop <= 0 && this.bottomToBottom < 0) {
        return {
          distance: this.bottomToBottom,
          side: 'bottom',
          direction: 'vertical'
        };
      }
    }
    return;
  }

  get isVerticallyInside(): boolean {
    return this.topToTop <= 0 && this.bottomToBottom >= 0;
  }

	constructor(
		public leftToLeft: number,
		public leftToRight: number,
		public rightToRight: number,
		public rightToLeft: number,
		public topToTop: number,
		public topToBottom: number,
		public bottomToBottom: number,
		public bottomToTop: number
	) {	}

  public static of(
		elementOne: ElementRef | Element | SbDimensions,
		elementTwo: ElementRef | Element | SbDimensions
	): SbDimensionsOverlap | undefined {
		let elementRectOne: SbDimensions;
		if (elementOne instanceof ElementRef) {
			elementRectOne = elementOne.nativeElement.getBoundingClientRect();
		} else if (elementOne instanceof Element) {
			elementRectOne = elementOne.getBoundingClientRect();
		} else {
			elementRectOne = elementOne;
		}

		let elementRectTwo: SbDimensions;
		if (elementTwo instanceof ElementRef) {
			elementRectTwo = elementTwo.nativeElement.getBoundingClientRect();
		} else if (elementTwo instanceof Element) {
			elementRectTwo = elementTwo.getBoundingClientRect();
		} else {
			elementRectTwo = elementTwo;
		}

		if (!elementRectOne || !elementRectTwo) {
			return;
		}

		// if dx is positive, the side of the elementRect is in the positive direction
		// if dy is positive, the side of the elementRect is in the positive direction
		return new SbDimensionsOverlap(
			- (elementRectOne.left - elementRectTwo.left), // left to left
			- (elementRectOne.left - elementRectTwo.right),  // left to right
			- (elementRectOne.right - elementRectTwo.right), // right to right
			- (elementRectOne.right - elementRectTwo.left), // right to left
			- (elementRectOne.top - elementRectTwo.top), // top to top
			- (elementRectOne.top - elementRectTwo.bottom), // top to bottom
			- (elementRectOne.bottom - elementRectTwo.bottom), // bottom to bottom
			- (elementRectOne.bottom - elementRectTwo.top) // bottom to top
		)
	}
}
