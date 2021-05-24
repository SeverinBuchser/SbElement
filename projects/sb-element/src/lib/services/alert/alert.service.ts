import { Injectable } from '@angular/core';
import { Alert } from '../../models/alert/alert';
import { AlertServiceSubscriber } from '../../models/alert/alert-service-subscriber';
import { Queue } from '../../models/queue/queue';

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
