import { Component, OnInit } from '@angular/core';
import { SbAlertService } from "sb-element";
import { DocService } from 'example-app/src/app/util/doc/doc.service';

@Component({
  selector: 'app-notification-example',
  templateUrl: './notification-example.component.html',
  styleUrls: ['./notification-example.component.scss']
})
export class NotificationExampleComponent implements OnInit {

  public toastDoc = '';
  public alertBoxDoc = '';

  constructor(private alertService: SbAlertService, private doc: DocService) { }

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

  ngOnInit(): void {
    this.doc.get('notification', 'toast').subscribe((doc: string) => {
      this.toastDoc = doc;
    })

    this.doc.get('notification', 'alert-box').subscribe((doc: string) => {
      this.alertBoxDoc = doc;
    })
  }

}
