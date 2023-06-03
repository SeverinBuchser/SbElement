import { coerceCssPixelValue } from '@angular/cdk/coercion';
import {
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Component, ElementRef, Input,
  NgZone,
  OnInit, ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { SbButtonComponent } from '../../button';
import {
  CanClassName,
  CanDisable,
  CanFocus,
  HasElementRef,
  mixinAccent,
  mixinClassName,
  mixinColor,
  mixinPlain,
  mixinSize,
  TriggerableOverlay
} from '../../core';

import { SbSelectOneCore } from '../select-one-core';

import { SbSelectButtonListComponent } from './select-button-list.component';

const SbSelectButtonCore = mixinAccent(
  mixinPlain(
    mixinSize(
      mixinColor(
        mixinClassName(SbSelectOneCore, 'sb-select-button')
      )
    )
  )
);

@Component({
  selector: 'sb-select[type=button]',
  templateUrl: './select-button.component.html',
  styleUrls: ['./select-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.open]': 'isVisible()'
  },
  inputs: [
    'isAccent: accent',
    'isPlain: plain',
    'size',
    'color',
    'disabled',
    'options'
  ],
  outputs: [
    'blur',
    'focus'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbSelectButtonComponent,
    multi: true
  }]
})
export class SbSelectButtonComponent extends SbSelectButtonCore<string>
implements CanClassName, CanDisable, CanFocus, ControlValueAccessor, HasElementRef, 
TriggerableOverlay, OnInit {
  
  @Input()
  public placeholder: string = '';

  public onReady: Subject<void> = new Subject();
  get triggerable(): TriggerableOverlay {
    return this;
  }

  @ViewChild(SbButtonComponent, { static: true })
  public button!: SbButtonComponent;

  private _overlayRef!: OverlayRef;
  private _overlayPortal!: ComponentPortal<SbSelectButtonListComponent>;
  private _list?: SbSelectButtonListComponent;
  private _positionStragegy!: FlexibleConnectedPositionStrategy;

  constructor(
    elementRef: ElementRef,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    private _ngZone: NgZone
  ) {
    super(elementRef);
  }

  public ngOnInit(): void {
    this._overlayPortal = new ComponentPortal(
      SbSelectButtonListComponent, 
      this._viewContainerRef
    );
    this._overlayRef = this._createOverlay();
    this._overlayRef.outsidePointerEvents().subscribe(() => {
      this.setFocusedState(false);
    })
    this.onReady.next();
    this.onReady.unsubscribe();
  }

  public select(option: string): void {
    super.select(option);
    this.trigger();
  }

  public getOutsidePointerEvents(): Observable<MouseEvent> {
    return this._overlayRef.outsidePointerEvents();
  }

  public isVisible(): boolean {
    return this._overlayRef.hasAttached();
  }

  public trigger(): void {
    if (!this._overlayRef.hasAttached()) {
      this._list = this._attachList();
      this._list.afterClose.subscribe(() => {
        this._list = undefined;
        this._setButtonWidth('auto');
        this._overlayRef.detach();
      })
      this._setMaxWidth();
      this._list.open();
      this.setFocusedState(true);
    } else {
      this._list!.close();
    }
  }

  private _attachList(): SbSelectButtonListComponent {
    const list = this._overlayRef.attach(this._overlayPortal).instance;
    list.options = this.options;
    list.isAccent = this.accent;
    list.isPlain = this.plain;
    list.size = this.size;
    list.color = this.color;
    list.disabled = this.disabled;
    
    list.select.subscribe((option: string) => this.select(option));
    return list;
  }

  private _createOverlay(): OverlayRef {
    const overlayConfig = new OverlayConfig();
    this._positionStragegy = this._overlay.position()
      .flexibleConnectedTo(this.button._elementRef)
      .withPositions([{
        originX: 'start', 
        originY: 'bottom', 
        overlayX: 'start', 
        overlayY: 'top'
      }])
      .withFlexibleDimensions()
      .withGrowAfterOpen()


    overlayConfig.positionStrategy = this._positionStragegy;
    overlayConfig.scrollStrategy = this._overlay.scrollStrategies.reposition({
      autoClose: true
    })

    return this._overlay.create(overlayConfig);
  }

  private _getButtonBoundingRect(): DOMRect {
    return this.button._elementRef.nativeElement.getBoundingClientRect();
  }

  private _getListBoundingRect(): DOMRect {
    if (!this._list) {
      throw new Error("SbSelectButtonComponent: EmbeddedViewRef is not attached yet!")
    }
    return this._list._elementRef.nativeElement.getBoundingClientRect();
  }

  private _setButtonWidth(width: any): void {
    this.button._elementRef.nativeElement.style.width = width;
  }

  private _setListWidth(width: any): void {
    if (this._list) {
      this._list._elementRef.nativeElement.style.width = width;
    }
  }

  private _setMaxWidth(): void {
    this._ngZone.onStable.pipe(take(1)).subscribe(() => {
      const buttonRect = this._getButtonBoundingRect();
      const listRect = this._getListBoundingRect();
      const maxWidth = coerceCssPixelValue(Math.max(
        buttonRect.width,
        listRect.width
      ));

      this._setButtonWidth(maxWidth)
      this._setListWidth(maxWidth)
      this._positionStragegy.withLockedPosition(false);
      this._overlayRef.updatePosition();
      this._positionStragegy.withLockedPosition(true);
    })
  }

}
