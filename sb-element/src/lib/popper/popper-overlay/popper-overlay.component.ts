import { Component, ElementRef, HostBinding, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { mixinClassName, mixinHide, SbAlignDirective, Triggerable } from '../../core';
import { PopperPosition } from '../popper/popper-position';

const SbPopperOverlayCore = mixinHide(
  mixinClassName(
    SbAlignDirective, 'sb-popper-overlay'
  ), false
);

@Component({
  selector: 'sb-popper-overlay',
  templateUrl: './popper-overlay.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SbPopperOverlayComponent extends SbPopperOverlayCore implements Triggerable {

  @ViewChild('arrow', {read: SbAlignDirective})
  public arrow!: SbAlignDirective;

  @Input() @HostBinding('class')
  public position: string = PopperPosition.TOP;

  get isTop(): boolean {
    return new RegExp(PopperPosition.TOP).test(this.position);
  }

  get isLeft(): boolean {
    return new RegExp(PopperPosition.LEFT).test(this.position);
  }

  get isRight(): boolean {
    return new RegExp(PopperPosition.RIGHT).test(this.position);
  }

  get isBottom(): boolean {
    return new RegExp(PopperPosition.BOTTOM).test(this.position);
  }

  get isStart(): boolean {
    return new RegExp('start').test(this.position);
  }

  get isEnd(): boolean {
    return new RegExp('end').test(this.position);
  }

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
    this.transitionElement = this._elementRef;
  }

  public trigger(): void {
    this.visible = !this.visible;
  }

  public alignRelative(contentBBox: DOMRect): void {
    let popperBBox = this.nativeElement.getBoundingClientRect();
    let arrowBBox = this.arrow.nativeElement.getBoundingClientRect();

    let pDx = 0;
    let pDy = 0;

    let aDx = 0;
    let aDy = 0;

    if (this.isTop || this.isBottom) {
      aDx = Math.min(
        popperBBox.width/2 - arrowBBox.width * 3/2,
        contentBBox.width / 2 - popperBBox.width / 2
      );
      if (this.isEnd) {
        pDx = contentBBox.width - popperBBox.width;
        aDx = -aDx;
      } else if (!this.isStart){
        pDx = contentBBox.width / 2 - popperBBox.width / 2;
        aDx = 0;
      }
    }

    if (this.isLeft || this.isRight) {
      aDy = Math.min(
        popperBBox.height/2 - arrowBBox.height * 3/2,
        contentBBox.height / 2 - popperBBox.height / 2
      );
      if (this.isEnd) {
        pDy = contentBBox.height - popperBBox.height;
        aDy = -aDy;
      } else if (!this.isStart){
        pDy = contentBBox.height / 2 - popperBBox.height / 2;
        aDy = 0;
      }
    }

    this.moveBy(pDx, pDy);
    this.arrow.moveBy(aDx, aDy);
  }

}
