import {
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  ViewChild,
  ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from '../common-behaviors';
import {
  CdkPortalOutlet,
  ComponentPortal,
  Portal,
  PortalOutlet,
  TemplatePortal } from '@angular/cdk/portal';

const SbOverlayContainerCore = mixinClassName(hasElementRefClass, 'sb-overlay-container');

@Component({
  selector: 'sb-overlay-container',
  templateUrl: './overlay-container.html',
  styleUrls: ['./overlay-container.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SbOverlayContainerComponent extends SbOverlayContainerCore
  implements PortalOutlet {

  @ViewChild(CdkPortalOutlet, { static: true })
  public _portalOutelt!: CdkPortalOutlet;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public attach<T>(portal: ComponentPortal<T>): ComponentRef<T>;
  public attach<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T>;
  public attach(portal: any): any;

  public attach(portal: Portal<any>): any {
    this._portalOutelt.attach(portal);
  }

  public detach() {
    this._portalOutelt.detach();
  }

  public dispose(): void {
    this._portalOutelt.dispose();
  }

  public hasAttached(): boolean {
    return this._portalOutelt.hasAttached();
  }

}
