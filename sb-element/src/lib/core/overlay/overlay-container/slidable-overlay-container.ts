import { AnimationEvent } from '@angular/animations';
import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { sbAnimations, SbSlideInOutAnimationState } from '../../animation';
import { SbSlideInOutAnimationParams } from '../../animation/slide-in-out';
import { SbConnectedSide } from '../position';
import { SbOverlayContainerComponent } from './overlay-container';

@Component({
  selector: 'sb-slidable-overlay-container',
  templateUrl: './overlay-container.html',
  encapsulation: ViewEncapsulation.None,
  animations: [sbAnimations.sbSlideInOutAnimation],
  host: {
    '[@slideInOutAnimation]': '{value: _animationState, params: _params}',
    '(@slideInOutAnimation.done)': '_onAnimationDone($event)'
  }
})
export class SbSlidableOverlayContainerComponent extends SbOverlayContainerComponent {

  private _animationState: SbSlideInOutAnimationState = 'void';
  private _entrySide?: SbConnectedSide;
  protected _params: SbSlideInOutAnimationParams = {
    animationDuration: "300ms",
    outsideOpacity: 1,
    centerOpacity: 1
  }

  get isInactive(): boolean {
    return !this._isCenter();
  }

  public beforeEnter: Subject<void> = new Subject();
  public afterEnter: Subject<void> = new Subject();
  public beforeExit: Subject<void> = new Subject();
  public afterExit: Subject<void> = new Subject();

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public enter(side: SbConnectedSide): void {
    this._entrySide = side;
    this.beforeEnter.next();
    if (this._isCenter()) {
      this.afterEnter.next();
    } else {
      if (this._isInital() || !this._isOnSide(side)) {
        this._animationState = <SbSlideInOutAnimationState>
          `inital-${side}-center`;
      } else {
        this._animationState = 'center';
      }
    }
  }

  public exit(side?: SbConnectedSide): void {
    this.beforeExit.next();
    if (!this._isCenter()) {
      this.afterExit.next();
    } else {
      if (!side) {
        this._animationState = this._entrySide!;
      } else {
        this._animationState = side;
      }
    }
  }

  public dispose(): void {
    super.dispose();
    this.beforeEnter.complete();
    this.afterEnter.complete();
    this.beforeExit.complete();
    this.afterExit.complete();
  }

  public _onAnimationDone(event: AnimationEvent): void {
    if (this._isCenter()) {
      this.afterEnter.next();
    } else {
      this.afterExit.next();
    }
  }

  private _isCenter(): boolean {
    return this._animationState.includes('center');
  }

  private _isInital(): boolean {
    return this._animationState == 'void';
  }

  private _isOnSide(side: SbConnectedSide): boolean {
    return this._animationState == side;
  }

}
