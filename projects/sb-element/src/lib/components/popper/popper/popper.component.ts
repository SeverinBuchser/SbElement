import { Component, ElementRef, HostBinding, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { AlignDirective, Poppable, ThemeInputDirective } from '../../../core/';
import { PopperPosition } from "./popper-position";

@Component({
  selector: 'sb-popper',
  templateUrl: './popper.component.html',
  styleUrls: ['./popper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopperComponent extends ThemeInputDirective implements Poppable {

  public rootClass = 'sb-popper';

  @Input()
  public position: string = PopperPosition.TOP;

  @Input()
  public visible: boolean = false;

  @ViewChild('content')
  public content!: ElementRef;

  @ViewChild('popper', {read: AlignDirective})
  public popper!: any;

  @ViewChild('popper', {read: ElementRef})
  public popperRef!: any;

  @ViewChild('arrow', {read: AlignDirective})
  public arrow!: AlignDirective;

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

  public trigger(): void {
    this.visible = !this.visible;
    if (this.visible) {
      let contentBBox = this.content.nativeElement.getBoundingClientRect();
      let popperBBox = this.popper.nativeElement.getBoundingClientRect();
      let arrowBBox = this.arrow.nativeElement.getBoundingClientRect();
      this.align(contentBBox, popperBBox, arrowBBox);
    }
  }

  public align(contentBBox: DOMRect, popperBBox: DOMRect, arrowBBox: DOMRect): void {
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

    this.popper.moveBy(pDx, pDy);
    this.arrow.moveBy(aDx, aDy);
  }

  public getPopperRef(): ElementRef<any> {
    return this.popperRef;
  }

  public isPopped(): boolean {
    return this.visible;
  }

  @HostBinding('class')
  get classes(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.position);
    return classes;
  }

  public getPopperClasses(): Array<string> {
    let classes: Array<string> = new Array<string>();
    classes.push(this.rootClass + '__popper');
    if (this.visible) {
      classes.push('visible');
    }
    return classes;
  }

}
