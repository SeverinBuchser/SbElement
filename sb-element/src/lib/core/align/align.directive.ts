import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[sbAlign]'
})
export class SbAlignDirective {

  get nativeElement(): HTMLElement {
    return this.host.nativeElement;
  }

  constructor(private host: ElementRef) { }

  public moveTo(x: number, y: number): void {
    let hostBBox = this.nativeElement.getBoundingClientRect();
    let hostX = hostBBox.x;
    let hostY = hostBBox.y;
    this.moveBy(x - hostX, y - hostY);
  }

  public moveBy(dx: number, dy: number): void {
    this.translate(dx, dy);
  }

  private translate(x: number, y: number) {
    this.nativeElement.style.transform = 'translate(' + x + 'px,' + y + 'px)';
  }

}
