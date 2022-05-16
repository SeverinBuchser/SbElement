import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from '../core';

const SbGridCore = mixinClassName(hasElementRefClass, 'sb-grid');

@Component({
  selector: 'sb-grid',
  templateUrl: './grid.html',
  styleUrls: ['./grid.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SbGridComponent extends SbGridCore {

  @Input()
  public gap: string | undefined;

  private _justify: 'even' | 'auto' = 'auto';
  @Input()
  set justify(justify: 'even' | 'auto') {
    this._justify = justify;
    this.update();
  };

  private _dimensions: Array<string | number> = [1, 1];
  @Input()
  set dim(dimensions: string | Array<number>) {
    let split: Array<string | number>;
    if (Array.isArray(dimensions)) {
      split = dimensions;
    } else {
      split = dimensions.split("x");
    }
    if (split.length == 2) {
      split = split.map((dim: string | number) => {
        return isNaN(parseInt(dim as string)) ? dim : parseInt(dim as string)
      });
      this._dimensions = split;
    }
    this.update();
  }

  @HostBinding('style.gridTemplateColumns') templateColumns!: string;
  @HostBinding('style.gridAutoColumns') autoColumns!: string;
  @HostBinding('style.gridTemplateRows') templateRows!: string;
  @HostBinding('style.gridAutoRows') autoRows!: string;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  private update() {
    let justify = this._justify == 'even' ? '1fr' : this._justify;

    if (typeof this._dimensions[0] == 'number') {
      this.templateColumns = `repeat(${this._dimensions[0]}, ${justify})`;
    } else {
      this.autoColumns = justify;
    }

    if (typeof this._dimensions[1] == 'number') {
      this.templateRows = `repeat(${this._dimensions[1]}, ${justify})`;
    } else {
      this.autoRows = justify;
    }
  }

}
