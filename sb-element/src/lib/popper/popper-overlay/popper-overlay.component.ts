import { Component, ElementRef, HostBinding, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Alignment, mixinClassName, mixinHide, Position, SbAlignRelateiveDirective, Side, Triggerable } from '../../core';

const SbPopperOverlayCore = mixinHide(
  mixinClassName(
    SbAlignRelateiveDirective, 'sb-popper-overlay'
  ), false
);

@Component({
  selector: 'sb-popper-overlay',
  templateUrl: './popper-overlay.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SbPopperOverlayComponent extends SbPopperOverlayCore implements Triggerable {

  @ViewChild('arrow', {read: SbAlignRelateiveDirective})
  public arrow!: SbAlignRelateiveDirective;

  @Input('position') @HostBinding('class')
  set stringPosition(position: string) {
    this.position = Position.parse(position);
    if (this.visible && this.currentContentBBox) {
      this.alignRelative(this.currentContentBBox);
    }
  }
  get stringPosition(): string {
    return this.position.toString();
  }

  @Input('alignment')
  set alignmentNumber(alignment: number) {
    this.position.alignment = alignment;
    if (this.visible && this.currentContentBBox) {
      this.alignRelative(this.currentContentBBox);
    }
  }

  public position: Position = new Position(Side.TOP, 0);
  private currentContentBBox?: DOMRect;

  constructor(elementRef: ElementRef) {
    super(elementRef);
    this.transitionElement = this._elementRef;
  }

  public trigger(): void {
    this.visible = !this.visible;

    if (!this.visible) {
      this.currentContentBBox = undefined;
    }
  }

  public alignRelative(contentBBox: DOMRect): Alignment {
    this.currentContentBBox = contentBBox;
    let alignment = super.alignRelative(
      contentBBox,
      this.position,
      {
        marginSide: {
          dx: this.arrow.width,
          dy: this.arrow.height
        },
        maxAlignment : {
          dx: (contentBBox.width - this.width) / 2,
          dy: (contentBBox.height - this.height) / 2
        }
      }
    );

    let borderRadius = parseFloat(getComputedStyle(this._elementRef.nativeElement).borderRadius);

    this.arrow.alignRelative(
      this.boundingClientRect,
      this.position.oppositeSide().oppositeAlignment(),
      {
        marginAlignment: {
          dx: borderRadius,
          dy: borderRadius,
        },
        minAlignment: {
          dx: Math.abs(alignment.offsetAlignment.dx),
          dy: Math.abs(alignment.offsetAlignment.dy)
        },
        maxAlignment : {
          dx: (this.width - this.arrow.width) / 2 - borderRadius,
          dy: (this.height - this.arrow.height) / 2 - borderRadius
        }
      }
    );

    return alignment;
  }

  public clear(): void {
    super.clear();
    this.arrow.clear();
  }

}
