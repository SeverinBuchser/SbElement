
/**
 * This interface describes an alert.
 *
 * The interface is used by the {@link AlertService} to create alerts and work
 * with the {@link AlertServiceSubscriber} which use/show the alerts.
 */
export interface Alert {
  /**
   * The message of the alert.
   */
  message: string;

  /**
   * The size of the alert.
   */
  size: string;

  /**
   * The color of the alert.
   */
  color: string;
}
