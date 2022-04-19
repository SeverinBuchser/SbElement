import { Injectable } from '@angular/core';
import { Color, SbOverlayService } from "../../core";
import { SbAlert, SbAlertOptions } from './alert';
import { Queue } from '../../models/queue/queue';
import { SbAlertComponent } from './alert.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SbAlertService extends Subject<SbAlertOptions> {

  private alertQueue: Queue<SbAlertOptions> = new Queue<SbAlertOptions>();

  private isBusy: boolean = false;

  constructor(
    private overlayService: SbOverlayService
  ) {
    super();
  }

  public warn(alertOptions: Partial<SbAlertOptions>): void {
    alertOptions.color = Color.WARN;
    this.alert(alertOptions);
  }

  public success(alertOptions: Partial<SbAlertOptions>): void {
    alertOptions.color = Color.SUCCESS;
    this.alert(alertOptions);
  }

  public inform(alertOptions: Partial<SbAlertOptions>): void {
    alertOptions.color = Color.INFO;
    this.alert(alertOptions);
  }

  public primary(alertOptions: Partial<SbAlertOptions>): void {
    alertOptions.color = Color.PRIMARY;
    this.alert(alertOptions);
  }

  public secondary(alertOptions: Partial<SbAlertOptions>): void {
    alertOptions.color = Color.SECONDARY;
    this.alert(alertOptions);
  }

  public alert(alertOptions: Partial<SbAlertOptions>): void {
    this.alertQueue.enqueue(new SbAlert(alertOptions));
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

  private async showAlert(alert: SbAlertOptions): Promise<void> {
    this.next(alert);
    let alertRef = this.overlayService.createCustom(SbAlertComponent);
    return alertRef.instance.alert(alert).then(() => {
      alertRef.destroy();
    });
  }
}
