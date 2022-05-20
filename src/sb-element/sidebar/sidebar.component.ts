import {
  GlobalPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { CdkPortal, ComponentPortal } from '@angular/cdk/portal';
import {
  Component, Injector, Input, OnChanges, OnDestroy, OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {
  SbConnectedSide, Triggerable
} from '../core';

import { SbSidebarContainerComponent } from './sidebar-container.component';

@Component({
  selector: 'sb-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SbSidebarComponent implements Triggerable, OnInit, OnChanges, OnDestroy {

  @Input()
  public side: SbConnectedSide = 'left';

  private _visible: boolean = false;
  @Input()
  set visible(isVisible: boolean) {
    if (this._visible != isVisible) {
      this._visible = !this._visible;
      if (this._visible) {
        this._showSidebar();
      } else {
        this._hideSidebar();
      }
    }
  }
  get visible(): boolean {
    return this._visible;
  }

  @ViewChild(CdkPortal, { static: true })
  public overlayPortal!: CdkPortal;
  private _overlayRef: OverlayRef;
  private _container!: SbSidebarContainerComponent;
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

  public ngOnInit(): void {
    this._attachSidebarContainer();
  }

  public ngOnChanges(simpleChanges: any): void {
    if (!simpleChanges.side.firstChange) {
      this._overlayRef.updatePositionStrategy(this._createPositionStrategy());
      this._container.updateSide(this.side);
    }
  }

  private _createPositionStrategy(): GlobalPositionStrategy {
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
    return positionStrategy;
  }

  private _createOverlay(): OverlayRef {
    const overlayConfig = new OverlayConfig();
    overlayConfig.positionStrategy = this._createPositionStrategy();
    overlayConfig.panelClass = 'sb-sidebar-overlay';
    return this._overlay.create(overlayConfig);
  }

  private _attachSidebarContainer(): void {
    this._container = this._overlayRef.attach(this._containerPortal).instance;
    this._container.attach(this.overlayPortal);
  }

  private _showSidebar(): void {
    this._container.enter(this.side);
  }

  private _hideSidebar(): void {
    this._container.exit();
  }

  public trigger(): void {
    this.visible = !this.visible;
  }

  public ngOnDestroy(): void {
    this._overlayRef.dispose();
  }
}
