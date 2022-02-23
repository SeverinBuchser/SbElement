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
    this.alertService.primary("Primary Notification", Size.MEDIUM);
  }

  alertSecondary() {
    this.alertService.secondary("Secondary Notification", Size.MEDIUM);
  }

  alertSuccess() {
    this.alertService.success("Success Notification", Size.MEDIUM);
  }

  alertWarn() {
    this.alertService.warn("Warn Notification", Size.MEDIUM);
  }

  alertInform() {
    this.alertService.inform("Info Notification", Size.MEDIUM);
  }

}
