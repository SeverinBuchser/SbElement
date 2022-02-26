import { Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { mixinClassName } from '../../core';

const SbGridCore = mixinClassName(
  class {
    constructor(
      public _elementRef: ElementRef) {}
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

  @Input()
  public justify: 'even' | 'auto' = 'auto';

  @Input()
  set dim(dimensions: string) {
    let split = dimensions.split("x");
    let justify = this.justify == 'even' ? '1fr' : this.justify;
    this.column = `repeat(${split[0]}, ${justify})`;
    this.row = `repeat(${split[1]}, ${justify})`;
  }

  @HostBinding('style.gridTemplateColumns') column!: string;
  @HostBinding('style.gridTemplateRows') row!: string;

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

}
