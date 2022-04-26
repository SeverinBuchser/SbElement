import { Component, ComponentRef, ElementRef, EmbeddedViewRef, Injector, NgModuleRef, TemplateRef, Type, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { SbAlignDirective } from '../../align';
import { mixinClassName } from '../../common-behaviors';

const SbOverlayOutletCore = mixinClassName(
  SbAlignDirective, 'sb-overlay-outlet'
);

@Component({
  selector: 'sb-overlay-outlet',
  templateUrl: './overlay-outlet.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SbOverlayOutletComponent extends SbOverlayOutletCore {

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

}
