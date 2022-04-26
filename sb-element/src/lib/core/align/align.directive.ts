import { Directive, ElementRef } from '@angular/core';
import { HasElementRef } from '../common-behaviors';

@Directive({
  selector: '[sbAlign]'
})
export class SbAlignDirective implements HasElementRef {

  get boundingClientRect(): DOMRect {
    return this._elementRef.nativeElement.getBoundingClientRect();
  }

  get width(): number {
    return this.boundingClientRect.width;
  }

  get height(): number {
    return this.boundingClientRect.height;
  }

  get style(): any {
    return this._elementRef.nativeElement.style;
  }

  constructor(public _elementRef: ElementRef) { }

  public moveTo(x: number, y: number): void {
    let hostBBox = this.boundingClientRect;
    let hostX = hostBBox.x;
    let hostY = hostBBox.y;
    this.moveBy(x - hostX, y - hostY);
  }

  public moveBy(dx: number, dy: number): void {
    this.translate(dx, dy);
  }

  private translate(x: number, y: number) {
    this.style.transform = 'translate(' + x + 'px,' + y + 'px)';
  }

  private setHeight(height: number) {
    this.style.height = `${height}px`;
  }

  private setWidth(width: number) {
    this.style.width = `${width}px`;
  }

  public setBoundingBox(bBox: DOMRect) {
    this.setHeight(bBox.height);
    this.setWidth(bBox.width);
    this.moveTo(bBox.x, bBox.y);
  }

  public clear() {
    this.style.height = '';
    this.style.width = '';
    this.style.transform = '';
  }

}
