import { Injectable } from '@angular/core';
import { Color, Size } from "../../../core";
import { SbAlert } from './alert';
import { AlertServiceSubscriber } from './alert-service-subscriber';
import { Queue } from '../../../models/queue/queue';

/**
 * Provides a global service to display alerts.
 *
 * The alert service can be used by any component which either whishes to show
 * or to create an alert to be shown.
 *
 * If a component wants to show alerts, the
 * component has to call [subscribe]{@link #subscribe} with the component as the
 * parameter. The component also needs to implement the
 * {@link AlertServiceSubscriber} interface so the service can inform the
 * subscriber about the incoming alerts.
 *
 * If a component wants to create an alert, the service provides different
 * methods which have predefined colors. The different methods take a `message`
 * which is a `string` and an optional `size` parameter, which is also a
 * `string`. The methods then passes the alert to the
 * {@link AlertServiceSubscriber} with a predefinded color. There is also a
 * method, which lets you customize everything: [alert]{@link #alert}. All these
 * methods then add the created alert to the [alertQueue]{@link #alertQueue},
 * and then call [work]{@link #work}. This method times the alerts and then
 * informs the subscriber when a alert needs to be shown (when an alert is
 * ready to be shown).
 *
 * The lifecycle of an {@link Alert} inside the service:
 * 1. The {@link Alert} gets created via a create call (like
 * [alert]{@link #alert}).
 * 2. The {@link Alert} gets placed into the [alertQueue]{@link #alertQueue}.
 * 3. The [work]{@link #work} method then removes an {@link Alert} out of the
 * queue and tells the subscribers to show the removed {@link Alert}. The
 * {@link Alert} gets collected by the garbage collector after the {@link Alert}
 * has been shown.
 * 4. If all subscribers have finished showing the {@link Alert}, the work
 * method checks if the [alertQueue]{@link #alertQueue} is empty or not. If the
 * queue is empty, the [work]{@link #work} method terminates. If not, go to step
 * 3 again.
 *
 */
@Injectable({
  providedIn: 'root'
})
export class SbAlertService {

  /**
   * An array of all subscribers.
   */
  private subscribers: Array<AlertServiceSubscriber>
    = new Array<AlertServiceSubscriber>();

  /**
   * The queue of all [Alerts]{@link Alert} which need to be shown.
   */
  private alertQueue: Queue<SbAlert> = new Queue<SbAlert>();

  /**
   * Flag to inidcate if the service is busy working on the
   * [alertQueue]{@link #alertQueue} or not.
   */
  private isBusy: boolean = false;

  /**
   * Adds a new subscriber into [subscribers]{@link #subscribers}.
   *
   * @param{AlertServiceSubscriber} subscriber The new subscriber
   */
  public subscribe(subscriber: AlertServiceSubscriber): void {
    this.subscribers.push(subscriber);
  }

  /**
   * Creates and shows an {@link Alert} with color `warn`.
   *
   * @param{string} message The message of the alert
   * @param{string} size The size of the alert
   */
  public warn(message: string, size = Size.DEFAULT): void {
    this.alert(message, size, Color.WARN);
  }

  /**
   * Creates and shows an {@link Alert} with color `success`.
   *
   * @param{string} message The message of the alert
   * @param{string} size The size of the alert
   */
  public success(message: string, size = Size.DEFAULT): void {
    this.alert(message, size, Color.SUCCESS);
  }

  /**
   * Creates and shows an {@link Alert} with color `info`.
   *
   * @param{string} message The message of the alert
   * @param{string} size The size of the alert
   */
  public inform(message: string, size = Size.DEFAULT): void {
    this.alert(message, size, Color.INFO);
  }

  /**
   * Creates and shows an {@link Alert} with color `primary`.
   *
   * @param{string} message The message of the alert
   * @param{string} size The size of the alert
   */
  public primary(message: string, size = Size.DEFAULT): void {
    this.alert(message, size, Color.PRIMARY);
  }

  /**
   * Creates and shows an {@link Alert} with color `secondary`.
   *
   * @param{string} message The message of the alert
   * @param{string} size The size of the alert
   */
  public secondary(message: string, size = Size.DEFAULT): void {
    this.alert(message, size, Color.SECONDARY);
  }

  /**
   * Creates and shows an {@link Alert}.
   *
   * The `message`, `size` and `color` of the {@link Alert} can be specified as
   * parameters. The {@link Alert} gets created with these parameters and
   * placed into the [alertQueue]{@link #alertQueue}. After that, the
   * [work]{@link #work} method gets called.
   *
   * @param{string} message The message of the alert
   * @param{string} size The size of the alert
   * @param{string} color The color of the alert
   */
  public alert(message: string, size = Size.DEFAULT, color = Color.WARN): void {
    this.alertQueue.enqueue({
      message,
      size,
      color
    });
    this.work();
  }

  /**
   * Works on the [alertQueue]{@link #alertQueue}.
   *
   * If the service is not busy working on the [alertQueue]{@link #alertQueue}
   * and the [alertQueue]{@link #alertQueue} is not empty, meaning that there
   * are still [Alerts]{@link Alert} to process, the method will set the
   * [isBusy]{@link #isBusy} flag, remove the next {@link Alert} from the queue
   * and show the {@link Alert} by calling [showAlert]{@link #showAlert}.
   *
   * Once the show call has finished, the [isBusy]{@link #isBusy} flag is unset
   * and the [work]{@link #work} method gets called again.
   *
   * If a current work call is still in progress, meaning the
   * [isBusy]{@link #isBusy} flag is set, a new work call will do nothing.
   */
  private async work(): Promise<void> {
    if (!this.alertQueue.isEmpty() && !this.isBusy) {
      this.isBusy = true;
      let alert = this.alertQueue.dequeue();
      if (alert) {
        this.showAlert(alert).then(() => {
          this.isBusy = false;
          this.work();
        });
      } else {
        this.isBusy = false;
      }
    }
  }


  /**
   * Notifies all subscibers to show an {@link Alert}.
   *
   * @param{Alert} alert The `Alert` to show
   * @returns{Promise<any>} A promise, which is resolved when all subscribers
   * have finished showing the `alert`
   */
  private async showAlert(alert: SbAlert): Promise<any> {
    return Promise.all(this.subscribers.map(subscriber =>
      subscriber.alert(alert)
    ));
  }
}
