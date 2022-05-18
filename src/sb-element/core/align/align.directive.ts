import { Directive, ElementRef } from '@angular/core';
import { HasElementRef } from '../common-behaviors';

@Directive({
  selector: '[sbAlign]'
})
export class SbAlignDirective implements HasElementRef {

  private translationAccumulation = {x: 0, y: 0};

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

  get translateX(): number {
    const style = getComputedStyle(this._elementRef.nativeElement);
    const matrix = new DOMMatrix(style.transform);
    return matrix.m41;
  }

  get translateY(): number {
    const style = getComputedStyle(this._elementRef.nativeElement);
    const matrix = new DOMMatrix(style.transform);
    return matrix.m42;
  }

  constructor(public _elementRef: ElementRef) { }

  public moveTo(x: number, y: number): void {
    this.accumulateMoveTo(x, y);
    this.applyAlignment();
  }

  public accumulateMoveTo(x: number, y: number): void {
    let hostBBox = this.boundingClientRect;
    let hostX = hostBBox.x;
    let hostY = hostBBox.y;
    this.accumulate(x - hostX, y - hostY);
  }

  public moveBy(dx: number, dy: number): void {
    this.accumulateMoveBy(dx, dy);
    this.applyAlignment();
  }

  public accumulateMoveBy(dx: number, dy: number): void {
    this.accumulate(dx + this.translateX, dy + this.translateY);
  }

  private accumulate(x: number, y: number): void {
    this.translationAccumulation.x += x;
    this.translationAccumulation.y += y;
  }

  public applyAlignment(): void {
    this.translate(this.translationAccumulation.x, this.translationAccumulation.y);
    this.translationAccumulation = {x: 0, y: 0};
  }

  private translate(x: number, y: number) {
    this.style.transform = 'translate(' + x + 'px,' + y + 'px)';
  }

  public setHeight(height: number) {
    this.style.height = `${height}px`;
  }

  public setWidth(width: number) {
    this.style.width = `${width}px`;
  }

  public setBoundingBox(bBox: DOMRect) {
    this.setHeight(bBox.height);
    this.setWidth(bBox.width);
    this.moveTo(bBox.x, bBox.y);
  }

  public clear() {
    this.style.height = 'none';
    this.style.width = 'none';
    this.style.transform = 'none';
  }

}
