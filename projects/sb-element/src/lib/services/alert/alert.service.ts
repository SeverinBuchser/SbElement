import { Injectable } from '@angular/core';
import { Alert } from '../../models/alert/alert';
import { AlertServiceSubscriber } from '../../models/alert/alert-service-subscriber';
import { Queue } from '../../models/queue/queue';

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
export class AlertService {

  private subscribers: Array<AlertServiceSubscriber> = new Array<AlertServiceSubscriber>();
  private alertQueue: Queue<Alert> = new Queue<Alert>();

  private isBusy: boolean = false;

  constructor() { }

  public subscribe(subscriber: AlertServiceSubscriber) {
    this.subscribers.push(subscriber);
  }

  public warn(message: string, size = 'd'): void {
    this.alert(message, size, 'warn');
  }

  public success(message: string, size = 'd'): void {
    this.alert(message, size, 'success');
  }

  public inform(message: string, size = 'd'): void {
    this.alert(message, size, 'info');
  }

  public primary(message: string, size = 'd'): void {
    this.alert(message, size, 'primary');
  }

  public secondary(message: string, size = 'd'): void {
    this.alert(message, size, 'secondary');
  }

  public alert(message: string, size = 'd', color = 'warn'): void {
    this.alertQueue.enqueue({
      message,
      size,
      color
    });
    this.work();
  }

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

  private async showAlert(alert: Alert): Promise<any> {
    return Promise.all(this.subscribers.map(subscriber => subscriber.alert(alert)));
  }
}
