import {
  Component,
  ElementRef,
  Inject,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import {
  mixinClassName, SbSlidableOverlayContainerComponent
} from '../core';
import {
  SbAlertConfig,
  SB_ALERT_CONFIG,
  SB_ALERT_CONFIG_DEFAULT
} from './alert-config';

/** @internal */
const SbAlertContainerCore = mixinClassName(
  SbSlidableOverlayContainerComponent, 
  'sb-alert-container'
);

@Component({
  selector: 'sb-alert-container',
  templateUrl: './alert-container.component.html',
  styleUrls: ['./alert-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SbAlertContainerComponent extends SbAlertContainerCore {

  private _config: SbAlertConfig;

  constructor(
    elementRef: ElementRef,
    @Inject(SB_ALERT_CONFIG_DEFAULT) private _defaultConfig: SbAlertConfig,
    @Optional() @Inject(SB_ALERT_CONFIG) config?: SbAlertConfig
  ) {
    super(elementRef);
    this._config = { 
      ...this._defaultConfig, 
      ...config,
    };
    this._params = {
      ...this._params,
      ...this._config,
      outsideOpacity: 0
    };
  }

  public enter(): void {
    super.enter(this._config.side);
  }
}
