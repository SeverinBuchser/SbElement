import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SbAlertService } from "sb-element";
import { DocService } from 'example-app/src/app/util/doc/doc.service';

@Component({
  selector: 'app-notification-example',
  templateUrl: './notification-example.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NotificationExampleComponent implements OnInit {

  public toastDoc = '';
  public alertBoxDoc = '';

  constructor(private alertService: SbAlertService, private doc: DocService) { }

  alertPrimary() {
    this.alertService.primary("Primary Notification");
  }

  alertSecondary() {
    this.alertService.secondary("Secondary Notification");
  }

  alertSuccess() {
    this.alertService.success("Success Notification");
  }

  alertWarn() {
    this.alertService.warn("Warn Notification");
  }

  alertInform() {
    this.alertService.inform("Info Notification");
  }

  ngOnInit(): void {
    this.doc.get('notification', 'toast').subscribe((doc: string) => {
      this.toastDoc = doc;
    })

    this.doc.get('notification', 'alert-box').subscribe((doc: string) => {
      this.alertBoxDoc = doc;
    })
  }

}
