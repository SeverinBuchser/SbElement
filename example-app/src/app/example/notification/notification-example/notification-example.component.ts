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
    this.alertService.primary({message: "Primary Notification"});
  }

  alertSecondary() {
    this.alertService.secondary({message: "Secondary Notification"});
  }

  alertSuccess() {
    this.alertService.success({message: "Success Notification"});
  }

  alertWarn() {
    this.alertService.warn({message: "Warn Notification"});
  }

  alertInform() {
    this.alertService.inform({message: "Info Notification"});
  }

}
