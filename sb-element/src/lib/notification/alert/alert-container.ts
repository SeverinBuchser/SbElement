import { AnimationEvent } from '@angular/animations';
import {
  Component,
  ElementRef,
  Inject,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  mixinClassName,
  sbAnimations,
  SbOverlayContainerComponent,
  SbSlideInOutAnimationState
} from '../../core';
import {
  SbAlertConfig,
  SB_ALERT_CONFIG,
  SB_ALERT_CONFIG_DEFAULT
} from './alert-config';

const SbAlertCore = mixinClassName(SbOverlayContainerComponent, 'sb-alert-container');

@Component({
  selector: 'sb-alert-container',
  templateUrl: './alert-container.html',
  encapsulation: ViewEncapsulation.None,
  animations: [sbAnimations.sbSlideInOutAnimation],
  host: {
    '[@slideInOutAnimation]': '{value: _animationState, params: _config }',
    '(@slideInOutAnimation.done)': '_onAnimationDone($event)'
  }
})
export class SbAlertContainerComponent extends SbAlertCore {

  private _config: SbAlertConfig;
  public _animationState: SbSlideInOutAnimationState = 'void';

  public afterExit: Subject<void> = new Subject();

  constructor(
    elementRef: ElementRef,
    @Inject(SB_ALERT_CONFIG_DEFAULT)
    private _defaultConfig: SbAlertConfig,
    @Optional() @Inject(SB_ALERT_CONFIG)
    config?: SbAlertConfig
  ) {
    super(elementRef);
    this._config = { ...this._defaultConfig, ...config };
  }

  public isInactive(): boolean {
    return !this._animationState.includes('center');
  }

  public enter(): void {
    if (this._animationState == 'void') {
      this._animationState = <SbSlideInOutAnimationState>
        `inital-${this._config.side}-center`;
    } else {
      this._animationState = 'center';
    }
  }

  public exit(): void {
    if (this.isInactive()) {
      this.afterExit.next();
      return
    }
    this._animationState = this._config.side;
  }

  public _onAnimationDone(event: AnimationEvent): void {
    if (event.toState == 'left'
      || event.toState == 'right'
      || event.toState == 'top'
      || event.toState == 'bottom'
    ) {
      this.afterExit.next();
    }
  }
}
