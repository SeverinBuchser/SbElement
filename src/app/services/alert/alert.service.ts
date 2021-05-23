import { Injectable } from '@angular/core';
import { Alert } from 'src/app/models/alert/alert';
import { AlertServiceSubscriber } from 'src/app/models/alert/alert-service-subscriber';
import { Queue } from 'src/app/models/queue/queue';

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

  public async alert(message: string): Promise<any> {
    this.alertQueue.enqueue({
      message
    });
    this.work();
  }

  private work(): void {
    if (!this.alertQueue.isEmpty() && !this.isBusy) {
      let alert = this.alertQueue.dequeue();
      if (alert) {
        this.isBusy = true;
        this.showAlert(alert).then(() => {
          this.isBusy = false;
          this.work();
        });
      }
    }
  }

  private async showAlert(alert: Alert): Promise<any> {
    return Promise.all(this.subscribers.map(subscriber => subscriber.alert(alert)));
  }
}
