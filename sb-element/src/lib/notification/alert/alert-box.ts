import { Component, ElementRef, Inject, Input, Optional, ViewEncapsulation } from '@angular/core';
import {
  hasElementRefClass,
  mixinClassName,
  mixinColor,
  mixinPill,
  mixinPlain,
  mixinSize,
  Size
} from '../../core';
import {
  SbAlertBoxConfig,
  SB_ALERT_DATA,
  SB_ALERT_BOX_CONFIG_DEFAULT
} from './alert-config';

export interface SbAlertBoxData {
  message: string;
}

const SbAlertBoxCore = mixinPill(
  mixinPlain(
    mixinSize(
      mixinColor(
        mixinClassName(hasElementRefClass, 'sb-alert-box')
      ),
      Size.MEDIUM
    )
  )
);

@Component({
  selector: 'sb-alert-box',
  templateUrl: './alert-box.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.only-arrow]': 'arrow && !icon',
    '[class.only-icon]': '!arrow && icon',
    '[class.no-icon]': '!arrow && !icon',
  },
  inputs: [
    'isPill: pill',
    'isPlain: plain',
    'size',
    'color'
  ]
})
export class SbAlertBoxComponent extends SbAlertBoxCore {

  private _config: SbAlertBoxConfig

  @Input()
  public message: string = '';

  @Input()
  public arrow: boolean = true;

  @Input()
  public icon: boolean = true;

  @Input()
  public customIcon: boolean = false;

  constructor(
    elementRef: ElementRef,
    @Inject(SB_ALERT_BOX_CONFIG_DEFAULT) private _defaultConfig: SbAlertBoxConfig,
    @Optional() @Inject(SB_ALERT_DATA) config?: SbAlertBoxConfig
  ) {
    super(elementRef);
    this._config = { ...this._defaultConfig, ...config };

    this.message = this._config.message;
    this.isPill = this._config.isPill;
    this.isPlain = this._config.isPlain;
    this.size = this._config.size;
    this.color = this._config.color;
    this.arrow = this._config.arrow;
    this.icon = this._config.icon;
  }

}
