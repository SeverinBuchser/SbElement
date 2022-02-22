import { Component } from '@angular/core';
import { SbAlertService, Size } from "sb-element";

@Component({
  selector: 'app-notification-example',
  templateUrl: './notification-example.component.html',
  styleUrls: ['./notification-example.component.scss']
})
export class NotificationExampleComponent {

  constructor(private alertService: SbAlertService) { }

  alertPrimary() {
    this.alertService.primary("Primary Notification", Size.DEFAULT);
  }

  alertSecondary() {
    this.alertService.secondary("Secondary Notification", Size.DEFAULT);
  }

  alertSuccess() {
    this.alertService.success("Success Notification", Size.DEFAULT);
  }

  alertWarn() {
    this.alertService.warn("Warn Notification", Size.DEFAULT);
  }

  alertInform() {
    this.alertService.inform("Info Notification", Size.DEFAULT);
  }

}
