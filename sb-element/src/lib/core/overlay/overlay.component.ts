import { Component, ComponentRef, ElementRef, EmbeddedViewRef, Injector, NgModuleRef, TemplateRef, Type, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
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

  @ViewChild('outlet', {read: ViewContainerRef, static: true})
  public outlet!: ViewContainerRef;

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

  public createEmbeddedView<C>(
    templateRef: TemplateRef<C>,
    context?: C,
    index?: number
  ): EmbeddedViewRef<C> {
    return this.outlet.createEmbeddedView<C>(templateRef, context, index);
  }

  public createComponent<C>(
    componentType: Type<C>,
    options?: {
      index?: number;
      injector?: Injector;
      ngModuleRef?: NgModuleRef<unknown>;
      projectableNodes?: Array<Array<Node>>;
    }
  ): ComponentRef<C> {
    return this.outlet.createComponent<C>(componentType, options);
  }

  public clear() {
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
