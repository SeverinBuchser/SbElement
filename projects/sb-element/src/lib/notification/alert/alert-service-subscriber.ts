import { SbAlert } from './alert';

/**
 * Interface for a subscriber of the {@link AlertService}. The Interface has to
 * be implemented by a subscriber. The subscriber then has to register itself to
 * the {@link AlertService} in order to receive alerts. The {@link AlertService}
 * then calls the [alert]{@link #alert} method of the subscriber with the given
 * {@link Alert}. The subscriber is then free to do anything with the given
 * {@link Alert}.
 */
export interface AlertServiceSubscriber {
  /**
   * This method is called, when the subscriber has registered itself by the
   * {@link AlertService}. When an {@link Alert} is created, the
   * {@link AlertService} calles the subscribers [alert]{@link #alert} method.
   *
   * @param{Alert} alert The alert to show.
   * @returns{Promise<void>} The subscriber has to return a `Promise<void>`
   * which will resolve upon finishing the process of showing the alert.
   */
  alert(alert: SbAlert): Promise<void>;
}
