import { ViewportRuler } from '@angular/cdk/scrolling';
import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewContainerRef,
  ViewEncapsulation } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Overlay, OverlayConfig, OverlayContainer, OverlayRef } from '@angular/cdk/overlay';
import {
  CanClassName,
  HasElementRef,
  mixinClassName,
  SbOverlayComponent,
  TriggerableOverlay,
  SbConnectedSide,
  SbFlexibleAlignment } from '../core/';
import { SbPopperContentComponent } from './popper-content';
import { SbPopperOverlayComponent } from './popper-overlay';
import { SbPopperPositionStrategy } from './popper-position-strategy';
import { Platform } from '@angular/cdk/platform';

const SbPopperCore = mixinClassName(SbOverlayComponent, 'sb-popper');

@Component({
  selector: 'sb-popper',
  templateUrl: './popper.html',
  styleUrls: ['./popper.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SbPopperComponent extends SbPopperCore implements HasElementRef, 
  CanClassName, TriggerableOverlay, OnInit, AfterContentInit, OnDestroy {

  public onReady: Subject<void> = new Subject();

  @ContentChild(SbPopperContentComponent, {read: ElementRef})
  public content!: ElementRef;

  @ContentChild(SbPopperContentComponent, { static: false })
  public popperContent!: SbPopperContentComponent;

  @Input()
  public customConnectionElement?: ElementRef | Element;

  @ContentChild(SbPopperOverlayComponent, { static: true })
  public popperOverlay!: SbPopperOverlayComponent;

  @Input()
  public position: SbConnectedSide = 'bottom';

  @Input()
  public alignment: SbFlexibleAlignment = 'start';

  private _overlayRef!: OverlayRef;
  private _positionStrategy!: SbPopperPositionStrategy;

  constructor(
    elementRef: ElementRef,
    viewContainerRef: ViewContainerRef,
    private _overlay: Overlay,
    private _ngZone: NgZone,
    private _viewportRuler: ViewportRuler,
    private _platform: Platform,
    private _overlayContainer: OverlayContainer
  ) {
    super(elementRef, viewContainerRef);
  }

  private _createOverlay(): OverlayRef {
    const overlayConfig = new OverlayConfig();
    this._positionStrategy = new SbPopperPositionStrategy(
      this.popperOverlay,
      this.customConnectionElement || this.popperContent._elementRef,
      this._ngZone,
      this._viewportRuler,
      this._platform,
      this._overlayContainer
    ).withPosition({
  		originSide: this.position,
      overlayAlignment: this.alignment
    })

    overlayConfig.positionStrategy = this._positionStrategy;
    overlayConfig.scrollStrategy = this._overlay.scrollStrategies.reposition()

    return this._overlay.create(overlayConfig);
  }

  public trigger(): void {
    if (!this._overlayRef.hasAttached()) {
      this._overlayRef.attach(this.overlayPortal)
    } else {
      this._overlayRef.detach();
    }
  }

  public getOutsidePointerEvents(): Observable<MouseEvent>  {
    return this._overlayRef.outsidePointerEvents();
  }

  public isVisible(): boolean {
    return this._overlayRef.hasAttached();
  }

  public ngAfterContentInit(): void {
    this._overlayRef = this._createOverlay();
    this.onReady.next();
    this.onReady.unsubscribe();
  }

  public ngOnDestroy(): void {
    this._overlayRef.dispose();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.alignment && this._positionStrategy) {
      this._positionStrategy.withPosition({
        originSide: this.position,
        overlayAlignment: this.alignment
      })
    }
  }

}
