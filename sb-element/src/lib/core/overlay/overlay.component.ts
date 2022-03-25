import { Component, ElementRef, EmbeddedViewRef, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { SbAlignDirective } from '../align';
import { mixinClassName } from '../common-behaviors';

const SbOverlayCore = mixinClassName(
  SbAlignDirective, 'sb-overlay'
);

@Component({
  selector: 'sb-overlay',
  templateUrl: './overlay.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SbOverlayComponent extends SbOverlayCore {

  @ViewChild('outlet', {read: ViewContainerRef})
  public outlet!: ViewContainerRef;

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

  public createEmbeddedView<C>(templateRef: TemplateRef<C>): EmbeddedViewRef<C> {
    return this.outlet.createEmbeddedView<C>(templateRef);
  }

  public reset() {
    this.nativeElement.style.height = '';
    this.nativeElement.style.width = '';
    this.nativeElement.style.transform = '';
  }

  public setBoundingBox(bBox: DOMRect) {
    this.setHeight(bBox.height);
    this.setWidth(bBox.width);
    this.moveTo(bBox.x, bBox.y);
  }

  private setHeight(height: number) {
    this.nativeElement.style.height = `${height}px`;
  }

  private setWidth(width: number) {
    this.nativeElement.style.width = `${width}px`;
  }

}
