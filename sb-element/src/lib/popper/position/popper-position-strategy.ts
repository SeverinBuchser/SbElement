import { coerceCssPixelValue } from "@angular/cdk/coercion";
import { OverlayContainer } from "@angular/cdk/overlay";
import { Platform } from "@angular/cdk/platform";
import { ViewportRuler } from "@angular/cdk/scrolling";
import { ElementRef, NgZone } from "@angular/core";
import { 
	extendStyles, 
	mergeDimensions, 
	SbDimensions, 
	SbFlexibleConnectedPositionConfig, 
	SbFlexibleConnectedPositionStrategy 
} from "../../core";
import { SbPopperOverlayComponent } from "../popper-overlay";


export class SbPopperPositionStrategy extends SbFlexibleConnectedPositionStrategy {

	private _arrowElement?: HTMLElement;
	private _arrowElementRect?: SbDimensions;
	private _arrowPosition?: SbDimensions;
	private _borderWidth: number = 0;

	constructor(
		private _popperOverlay: SbPopperOverlayComponent,
		origin: ElementRef | Element,
		ngZone: NgZone,
		viewportRuler: ViewportRuler,
    platform: Platform,
		overlayContainer: OverlayContainer
	) {
		super(origin, ngZone, viewportRuler, platform, overlayContainer);
		this.withOverflowPrevention();
		this._arrowElement = this._popperOverlay.arrow._elementRef.nativeElement;
	}

	public apply(): void {
		const computedArrowStyle = getComputedStyle(
			this._popperOverlay._elementRef.nativeElement
		);
		this._positionConfig.margin = parseInt(computedArrowStyle.padding) / 2 
		this._borderWidth = parseInt(computedArrowStyle.borderWidth);
		this._borderWidth = isNaN(this._borderWidth) ? 0 : this._borderWidth;

		super.apply();

		this._popperOverlay.setPositionClass(this._actualPositionConfig!.originSide);
		this._arrowElementRect = this._getArrowElementRect();

		this._calculateArrowPosition();
		this._setArrowElementStyles();
	}

	public dispose(): void {
    super.dispose();
    this._resetArrowElementStyles();
		this._arrowElement = null!
  }

	private _calculateArrowPosition(): void {
		const positionConfig = this._actualPositionConfig!;

		const currentPosition = this._position!;
		const originRect = this._originRect!;
		const arrowElementRect = this._arrowElementRect!;
		console.log(currentPosition, arrowElementRect)

		let left: number = 0;
		let top: number = 0;
		let width: number = arrowElementRect.width;
		let height: number = arrowElementRect.height;

		switch (positionConfig.originSide) {
			case 'top':
				height = this._positionConfig.margin!;
				width = this._positionConfig.margin! * 2;
				top = currentPosition.height;
				left = (originRect.width - width) / 2 - currentPosition.left + originRect.left;
				left = Math.max(this._getMargin(), left);
				left = Math.min(currentPosition.width - 3 * this._getMargin(), left);
				break;

			case 'bottom':
				height = this._positionConfig.margin!;
				width = this._positionConfig.margin! * 2;
				top = - this._getMargin();
				left = (originRect.width - width) / 2 - currentPosition.left + originRect.left;
				left = Math.max(this._getMargin(), left);
				left = Math.min(currentPosition.width - 3 * this._getMargin(), left);
				break;

			case 'left':
				height = this._positionConfig.margin! * 2;
				width = this._positionConfig.margin!;
				left = currentPosition.width;
				top = (originRect.height - height) / 2 - currentPosition.top + originRect.top;
				top = Math.max(this._getMargin(), top);
				top = Math.min(currentPosition.height - 3 * this._getMargin(), top);
				break;

			case 'right':
				height = this._positionConfig.margin! * 2;
				width = this._positionConfig.margin!;
				left = - this._getMargin();
				top = (originRect.height - height) / 2 - currentPosition.top + originRect.top;
				top = Math.max(this._getMargin(), top);
				top = Math.min(currentPosition.height - 3 * this._getMargin(), top);
				break;
		}

		top -= this._borderWidth;
		left -= this._borderWidth;

		this._arrowPosition = mergeDimensions(arrowElementRect, {
			top,
			bottom: top + height,
			left,
			right: left + width,
			height,
			width
		});
	}

	public withPosition(
		positionConfig: Omit<SbFlexibleConnectedPositionConfig, 'margin'>
	): SbPopperPositionStrategy {
		super.withPosition(positionConfig);
		return this;
	}

	public withCloseOnOutside(
		closeOnOutside: boolean = true
	): SbPopperPositionStrategy {
		super.withCloseOnOutside(closeOnOutside);
		return this;
	}

	public withCloseOnClipping(
		closeOnClipping: boolean = true,
		force: boolean = false
	): SbPopperPositionStrategy {
		super.withCloseOnClipping(closeOnClipping, force);
		return this;
	}

	public withOverflowPrevention(
		overflowPrevention: boolean = true,
		force: boolean = false
	): SbPopperPositionStrategy {
		super.withOverflowPrevention(overflowPrevention, force);
		return this;
	}


	protected _getArrowElementRect(): SbDimensions {
		return this._arrowElement!.getBoundingClientRect();
	}

	private _setArrowElementStyles(): void {
		const styles = {} as CSSStyleDeclaration;

		if (this._arrowPosition) {
	    styles.top = this._arrowPosition.top ?
				coerceCssPixelValue(this._arrowPosition.top) : 'none';
	    styles.left = this._arrowPosition.left ?
				coerceCssPixelValue(this._arrowPosition.left) : 'none';
			styles.width = this._arrowPosition.width ?
				coerceCssPixelValue(this._arrowPosition.width) : 'auto';
			styles.height = this._arrowPosition.height ?
				coerceCssPixelValue(this._arrowPosition.height) : 'auto';
		}

		extendStyles(this._arrowElement!.style, styles)
	}


	private _resetArrowElementStyles() {
		if (this._arrowElement) {
	    extendStyles(this._arrowElement.style, {
				left: '',
	      top: ''
	    } as CSSStyleDeclaration);
		}
  }
}
