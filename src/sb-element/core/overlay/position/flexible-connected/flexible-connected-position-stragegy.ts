import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { OverlayContainer, PositionStrategy, ViewportRuler } from '@angular/cdk/overlay';
import { OverlayReference } from '@angular/cdk/overlay/overlay-reference';
import { Platform } from '@angular/cdk/platform';
import { ElementRef, EventEmitter, NgZone } from '@angular/core';
import { merge, Subscription } from 'rxjs';

import { extendStyles } from '../../../util';
import { mergeDimensions, SbDimensions } from '../dimensions';
import { SbDimensionsOverlapOverflow } from '../overflow';
import { SbDimensionsOverlap } from '../overlap';
import { SbConnectedSide } from '../position';
import {
	calculateFlexibleAlignment,
	defaultFlexibleConnectedPositionConfig,
	getFlexibleAlignment,
	SbFlexibleConnectedPositionConfig,
	validateFlexibleConnectedPositionConfig
} from './flexible-connected-position-config';


export class SbFlexibleConnectedPositionStrategy implements PositionStrategy {

	private _isDisposed: boolean = false;
	private _realign: EventEmitter<void> = new EventEmitter();
	private _applySubscription: Subscription = Subscription.EMPTY;

	private _overlayRef?: OverlayReference
	private _overlayElement?: HTMLElement;

	protected _positionConfig: SbFlexibleConnectedPositionConfig =
		defaultFlexibleConnectedPositionConfig;
	protected _actualPositionConfig?: SbFlexibleConnectedPositionConfig =
		defaultFlexibleConnectedPositionConfig;
	private _closeOnOutside: boolean = false;
	private _closeOnClipping: boolean = false;
  private _overflowPrevention: boolean = false;

	protected _originRect?: SbDimensions;
	protected _containerRect?: SbDimensions;
	protected _overlayElementRect?: SbDimensions;

  private _originOverlap?: SbDimensionsOverlap;
  private _overlayOverlap?: SbDimensionsOverlap;

	protected _position?: SbDimensions;

	constructor(
		protected _origin: ElementRef | Element,
		protected _ngZone: NgZone,
		private _viewportRuler: ViewportRuler,
    private _platform: Platform,
		private _overlayContainer: OverlayContainer
	) {}

  public apply(): void {
		if (this._isDisposed || !this._platform.isBrowser) {
      return;
    }

		this._originRect = this._getOriginRect();
		this._containerRect = this._getContainerRect();
		this._overlayElementRect = this._getOverlayElementRect();

		this._calculatePosition(this._positionConfig);

		this._overlayOverlap = SbDimensionsOverlap.of(
			this._position!,
			this._containerRect
		);
		this._originOverlap = SbDimensionsOverlap.of(
			this._originRect,
			this._containerRect
		);

		this._adaptPosition();
		this._checkClose();
		this._setOverlayElementStyles();
  }

  public attach(overlayRef: OverlayReference): void {
		if (this._overlayRef && overlayRef !== this._overlayRef) {
			throw new Error('This position strategy is already attached to an overlay')
		}

		this._overlayRef = overlayRef;
		this._overlayElement = overlayRef.overlayElement;
		this._applySubscription.unsubscribe();
		this._applySubscription = merge(
			this._viewportRuler.change(),
			this._realign
		).subscribe(() => {
			this.apply();
		})
  }

  public detach(): void {
    this._applySubscription.unsubscribe();
  }

	public dispose(): void {
    if (this._isDisposed) {
      return;
    }

    this._resetOverlayElementStyles();

    this.detach();
    this._realign.complete();
    this._overlayRef = null!;
		this._overlayElement = null!;
    this._isDisposed = true;
  }

	public withPosition(
		positionConfig: SbFlexibleConnectedPositionConfig
	): SbFlexibleConnectedPositionStrategy {
		validateFlexibleConnectedPositionConfig(positionConfig);
		this._positionConfig = positionConfig;
		this._realign.emit();
		return this;
	}

	public withCloseOnOutside(
		closeOnOutside: boolean = true
	): SbFlexibleConnectedPositionStrategy {
		this._closeOnOutside = closeOnOutside;
		this._realign.emit();
		return this;
	}

	public withCloseOnClipping(
		closeOnClipping: boolean = true,
		force: boolean = false
	): SbFlexibleConnectedPositionStrategy {
		this._closeOnClipping = closeOnClipping;
		if (this._overflowPrevention && !force) {
			throw new Error('Cannot enable both "closeOnClipping" and '
				+ '"overflowPrevention"');
		}
		this._overflowPrevention = false;
		this._realign.emit();
		return this;
	}

	public withOverflowPrevention(
		overflowPrevention: boolean = true,
		force: boolean = false
	): SbFlexibleConnectedPositionStrategy {
		this._overflowPrevention = overflowPrevention;
		if (this._closeOnClipping && !force) {
			throw new Error('Cannot enable both "moveLeastOnClipping" and '
				+ '"closeOnClipping"');
		}
		this._closeOnClipping = false;
		this._realign.emit();
		return this;
	}

	private _calculatePosition(positionConfig: SbFlexibleConnectedPositionConfig): void {
		const originRect = this._originRect!;
		const overlayElementRect = this._overlayElementRect!;

		let top: number = 0;
		let left: number = 0;

		switch (positionConfig.originSide) {
			case 'top':
				top = originRect.top - overlayElementRect.height - this._getMargin();
				left = originRect.left + calculateFlexibleAlignment(
					positionConfig,
					originRect.width - overlayElementRect.width
				);
				break;

			case 'bottom':
				top = originRect.bottom + this._getMargin();
				left = originRect.left + calculateFlexibleAlignment(
					positionConfig,
					originRect.width - overlayElementRect.width
				);
				break;

			case 'left':
				left = originRect.left - overlayElementRect.width - this._getMargin();
				top = originRect.top + calculateFlexibleAlignment(
					positionConfig,
					originRect.height - overlayElementRect.height
				);
				break;

			case 'right':
				left = originRect.right + this._getMargin();
				top = originRect.top + calculateFlexibleAlignment(
					positionConfig,
					originRect.height - overlayElementRect.height
				);
				break;
		}

		this._position = mergeDimensions(overlayElementRect, {
			top,
			bottom: top + overlayElementRect.height,
			left,
			right: left + overlayElementRect.width
		});

		this._actualPositionConfig = positionConfig;
	}

	private _adaptPosition(): void {
		const overlayOverlap = this._overlayOverlap!;

		if (this._overflowPrevention && (
				overlayOverlap.isClipping || overlayOverlap.isOutside
			)) {

			const adaptedConfig: any = {};

			const adaptedOriginSide = this._adaptOriginSide();
			if (adaptedOriginSide) {
				adaptedConfig.originSide = adaptedOriginSide;
			}

			let adaptedOverlayAlignment = this._adaptOverlayAlignment();
			if (adaptedOverlayAlignment !== undefined) {
				adaptedConfig.overlayAlignment = adaptedOverlayAlignment;
			}

			this._calculatePosition({
				...this._positionConfig,
				...adaptedConfig
			});
		}

	}

	private _adaptOverlayAlignment(): number | undefined {
		const overlayElementRect = this._overlayElementRect!;
		const originRect = this._originRect!;

		const overlayOverlap = this._overlayOverlap!;
		const horizontalOverflow = overlayOverlap.horizontalOverflow;
		const verticalOverflow = overlayOverlap.verticalOverflow;

		if (horizontalOverflow && !this._overflowsInOriginSideDirection(horizontalOverflow)) {
			return this._calculateAdaptedAlignment(
				horizontalOverflow.distance,
				originRect.width - overlayElementRect.width
			);
		}

		if (verticalOverflow && !this._overflowsInOriginSideDirection(verticalOverflow)) {
			return this._calculateAdaptedAlignment(
				verticalOverflow.distance,
				originRect.height - overlayElementRect.height
			);
		}

		return;
	}

	private _calculateAdaptedAlignment(
		overflowDistance: number,
		dimension: number
	): number {
		const overlayAlignment = getFlexibleAlignment(this._positionConfig);
		return overlayAlignment + 2 * overflowDistance / dimension;
	}

	private _adaptOriginSide(): SbConnectedSide | undefined {
		const overlayOverlap = this._overlayOverlap!;
		const horizontalOverflow = overlayOverlap.horizontalOverflow;
		const verticalOverflow = overlayOverlap.verticalOverflow;

		const spaceLeft = this._getSpaceLeft();

		if (horizontalOverflow && this._overflowsOnOriginSide(horizontalOverflow)) {
			if (horizontalOverflow.side == 'left' && spaceLeft.right > 0) {
				return 'right';
			}
			if (horizontalOverflow.side == 'right' && spaceLeft.left > 0) {
				return 'left';
			}
		}

		if (verticalOverflow && this._overflowsOnOriginSide(verticalOverflow)) {
			if (verticalOverflow.side == 'top' && spaceLeft.bottom > 0) {
				return 'bottom';
			}
			if (verticalOverflow.side == 'bottom' && spaceLeft.top > 0) {
				return 'top';
			}
		}
		return;
	}

	private _getSpaceLeft(): {left: number, right: number, top: number, bottom: number} {
		const originOverlap = this._originOverlap!;
		const overlayElementRect = this._overlayElementRect!;

		return {
			left: -originOverlap.leftToLeft - overlayElementRect.width,
			right: originOverlap.rightToRight - overlayElementRect.width,
			top: -originOverlap.topToTop - overlayElementRect.height,
			bottom: originOverlap.bottomToBottom - overlayElementRect.height
		}
	}

	private _overflowsOnOriginSide(overflow: SbDimensionsOverlapOverflow): boolean {
		return overflow.side == this._positionConfig.originSide;
	}

	private _overflowsInOriginSideDirection(
		overflow: SbDimensionsOverlapOverflow
	): boolean {
		if (this._positionConfig.originSide == 'left'
		|| this._positionConfig.originSide == 'right') {
			return overflow.direction == 'horizontal';
		} else {
			return overflow.direction == 'vertical';
		}
	}

	private _checkClose(): void {
		const overlayOverlap = this._overlayOverlap!;

		if (this._closeOnClipping && overlayOverlap.isClipping
			|| this._closeOnOutside && overlayOverlap.isOutside) {
			if (this._overlayRef!.hasAttached()) {
				this._ngZone.run(() => this._overlayRef!.detach());
			}
		}
	}

	protected _getMargin(): number {
		return this._positionConfig.margin ? this._positionConfig.margin : 0;
	}

	private _setOverlayElementStyles(): void {
		const containerRect = this._getContainerRect();
		const styles = {} as CSSStyleDeclaration;

		if (this._position) {
	    styles.top = coerceCssPixelValue(this._position.top);
	    styles.left = coerceCssPixelValue(this._position.left);
			styles.maxWidth = coerceCssPixelValue(containerRect.width);
			styles.maxHeight = coerceCssPixelValue(containerRect.height);
		}

		extendStyles(this._overlayElement!.style, styles)
	}

	private _resetOverlayElementStyles() {
		if (this._overlayElement) {
	    extendStyles(this._overlayElement.style, {
				left: '',
	      top: '',
	      maxWidth: '',
	      maxHeight: '',

	    } as CSSStyleDeclaration);
		}
  }

	protected _getContainerRect(): SbDimensions {
		return this._overlayContainer.getContainerElement().getBoundingClientRect();
	}

	protected _getOverlayElementRect(): SbDimensions {
		return this._overlayElement!.getBoundingClientRect();
	}

	protected _getOriginRect(): SbDimensions {
		if (this._origin instanceof ElementRef) {
			return this._origin.nativeElement.getBoundingClientRect();
		} else {
			return this._origin.getBoundingClientRect();
		}
	}

}
