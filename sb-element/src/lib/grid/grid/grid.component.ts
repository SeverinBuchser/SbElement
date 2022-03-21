import { Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { mixinClassName } from '../../core';

const SbGridCore = mixinClassName(
  class {
    constructor(public _elementRef: ElementRef) {}
  }, 'sb-grid'
);

@Component({
  selector: 'sb-grid',
  templateUrl: './grid.component.html',
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

  private _dimensions: string = '1x1';
  @Input()
  set dim(dimensions: string) {
    this._dimensions = dimensions;
    this.update();
  }

  @HostBinding('style.gridTemplateColumns') column!: string;
  @HostBinding('style.gridTemplateRows') row!: string;

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

  private update() {
    let split = this._dimensions.split("x");
    let justify = this._justify == 'even' ? '1fr' : this._justify;
    this.column = `repeat(${split[0]}, ${justify})`;
    this.row = `repeat(${split[1]}, ${justify})`;
  }

}
