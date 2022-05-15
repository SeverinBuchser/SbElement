import { InjectionToken } from "@angular/core";
import { Color, SbConnectedSide, SbFlexibleAlignment, Size } from "../../core";

export interface SbAlertBoxConfig {
  message: string,
  isPill: boolean;
  isPlain: boolean;
  size: Size;
  color: Color;
  arrow: boolean;
  icon: boolean;
  showTime: number;
  pauseTime: number;
}

export const SB_ALERT_BOX_CONFIG_DEFAULT_DEFAULT: SbAlertBoxConfig = {
  message: '',
  isPill: false,
  isPlain: false,
  size: Size.MEDIUM,
  color: Color.PRIMARY,
  arrow: true,
  icon: true,
  showTime: 2000,
  pauseTime: 500
}

export const SB_ALERT_BOX_CONFIG_DEFAULT = new InjectionToken<SbAlertBoxConfig>(
  'alert-box.config.default'
);

export interface SbAlertConfig<D = any> {
  animationDuration: string;
  side: SbConnectedSide;
  alignment: 'start' | 'end' | 'center';
  isInterruptable: boolean;
  duration?: number,
  data?: D | null;
}

export const SB_ALERT_CONFIG_DEFAULT_DEFAULT: SbAlertConfig = {
  animationDuration: '.3s',
  side: 'top',
  alignment: 'center',
  isInterruptable: false,
  duration: 2000,
  data: null
}

export const SB_ALERT_CONFIG_DEFAULT = new InjectionToken<SbAlertConfig>(
  'alert.config.default'
);

export const SB_ALERT_CONFIG = new InjectionToken<SbAlertConfig>(
  'alert.config'
);

export const SB_ALERT_DATA = new InjectionToken<any>('alert-data');
