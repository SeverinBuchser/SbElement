import {
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  ViewChild,
  ViewEncapsulation } from '@angular/core';
import { mixinClassName } from '../../common-behaviors';
import { SbAlignDirective } from '../../align';
import { CdkPortalOutlet, ComponentPortal, Portal, PortalOutlet, TemplatePortal } from '@angular/cdk/portal';

const SbOverlayOutletCore = mixinClassName(SbAlignDirective, 'sb-overlay-outlet');

@Component({
  selector: 'sb-overlay-outlet',
  templateUrl: './overlay-outlet.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SbOverlayOutletComponent extends SbOverlayOutletCore implements PortalOutlet {

  @ViewChild(CdkPortalOutlet, { static: true })
  public portalOutelt!: CdkPortalOutlet;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public attach<T>(portal: ComponentPortal<T>): ComponentRef<T>;
  public attach<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T>;
  public attach(portal: any): any;

  public attach(portal: Portal<any>): any {
    this.portalOutelt.attach(portal);
  }

  public detach() {
    this.portalOutelt.detach();
  }

  public dispose(): void {
    this.portalOutelt.dispose();
  }

  public hasAttached(): boolean {
    return this.portalOutelt.hasAttached();
  }

}
