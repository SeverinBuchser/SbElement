import { Component, ElementRef, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName, SbAlertService } from 'sb-element';

@Component({
  selector: 'app-alert-example',
  templateUrl: './alert-example.html',
  styleUrls: ['./alert-example.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"sb--padding-s"'
  }
})
export class AlertExampleComponent extends mixinClassName(
  hasElementRefClass, 'app-alert-example') {

  @ViewChild('customAlertTemplate', { static: true })
  public customAlertTemplate!: TemplateRef<any>;

  constructor(
    elementRef: ElementRef,
    private alertService: SbAlertService
  ) {
    super(elementRef);
  }

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

  alertCustom() {
    this.alertService.alertFromTemplate(this.customAlertTemplate)
  }
}
