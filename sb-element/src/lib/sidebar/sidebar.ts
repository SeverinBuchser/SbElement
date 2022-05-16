import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, ComponentPortal } from '@angular/cdk/portal';
import {
  Component, ComponentRef, Injector, Input, OnDestroy, OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  SbConnectedSide, Triggerable
} from '../core';
import { SbSidebarContainerComponent } from './sidebar-container';

@Component({
  selector: 'sb-sidebar',
  templateUrl: './sidebar.html',
  encapsulation: ViewEncapsulation.None
})
export class SbSidebarComponent implements Triggerable, OnDestroy {

  @Input()
  public side: SbConnectedSide = 'left';

  @Input()
  set visible(isVisible: boolean) {
    if (this._overlayRef.hasAttached() !== isVisible) {
      this.trigger();
    }
  }
  get visible(): boolean {
    return this._overlayRef.hasAttached();
  }

  @ViewChild(CdkPortal, { static: true })
  public overlayPortal!: CdkPortal;
  private _overlayRef: OverlayRef;
  private _container?: SbSidebarContainerComponent;
  private _containerPortal = new ComponentPortal(
    SbSidebarContainerComponent,
    undefined,
    this._injector
  );

  constructor(
    private _injector: Injector,
    private _overlay: Overlay
  ) {
    this._overlayRef = this._createOverlay();
  }

  private _createOverlay(): OverlayRef {
    const overlayConfig = new OverlayConfig();
    const positionStrategy = this._overlay.position().global();

    switch (this.side) {
      case 'left':
        positionStrategy.left('0');
        break;
      case 'right':
        positionStrategy.right('0');
        break;
      case 'top':
        positionStrategy.top('0');
        break;
      case 'bottom':
        positionStrategy.bottom('0');
        break;
    }
    overlayConfig.positionStrategy = positionStrategy;
    overlayConfig.backdropClass = 'sb-sidebar-backdrop';
    overlayConfig.hasBackdrop = true;
    return this._overlay.create(overlayConfig);
  }

  private _attachSidebarContainer(): void {
    this._container = this._overlayRef.attach(this._containerPortal).instance;
    this._container.attach(this.overlayPortal);
    this._container.afterExit.subscribe(() => {
      this._overlayRef.detach();
      this._container!.dispose();
    });
  }

  public trigger(): void {
    if (!this._overlayRef.hasAttached()) {
      this._attachSidebarContainer();
      this._container!.enter(this.side);
    } else {
      this._container!.exit();
    }
  }

  public ngOnDestroy(): void {
    this._overlayRef.dispose();
  }
}
