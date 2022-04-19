import { Color, Size } from "../../core";

/**
 * This interface describes an alert.
 *
 * The interface is used by the {@link AlertService} to create alerts and work
 * with the {@link AlertServiceSubscriber} which use/show the alerts.
 */
export interface SbAlertOptions {
  message: string;
  size: Size;
  color: Color;
  arrow: boolean;
  icon: boolean;
  showTime: number;
  pauseTime: number;
}

export class SbAlert implements SbAlertOptions {

  public message: string = '';
  public size: Size = Size.MEDIUM;
  public color: Color = Color.PRIMARY;
  public arrow: boolean = true;
  public icon: boolean = true;
  public showTime: number = 2000;
  public pauseTime: number = 500;

  constructor(options?: Partial<SbAlertOptions>) {
    Object.assign(this, options);
  }
}
