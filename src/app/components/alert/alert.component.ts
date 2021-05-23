import { Component } from '@angular/core';
import { Alert } from 'src/app/models/alert/alert';
import { AlertServiceSubscriber } from 'src/app/models/alert/alert-service-subscriber';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { SizeThemeColorInputDirective } from '../base/style-input/size-theme-color-input.directive';

@Component({
  selector: 'sb-el-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent extends SizeThemeColorInputDirective implements AlertServiceSubscriber {

  public rootClass: string = 'sb-el-alert';

  public alertObject: Alert | null = null;
  public show: boolean = false;
  private appearTime: number = 1000;
  private showTime: number = 5000;
  private hideTime: number = 1000;

  constructor(
    private alertService: AlertService,
    themeService: ThemeService
  ) {
    super(themeService);
    this.alertService.subscribe(this);
  }

  public async alert(alert: Alert): Promise<void> {
    return this.setAlert(alert)
    .then(() => this.wait())
    .then(() => this.resetAlert())
  }

  private setAlert(alert: Alert): Promise<void> {
    return new Promise<void>(resolve => {
      this.alertObject = alert;
      this.show = true;
      setTimeout(() => resolve(), this.appearTime);
    });
  }

  private wait(): Promise<void> {
    return new Promise<void>(resolve => {
      setTimeout(() => resolve(), this.showTime);
    });
  }

  private resetAlert(): Promise<void> {
    return new Promise<void>(resolve => {
      this.show = false;
      this.alertObject = null;
      setTimeout(() => resolve(), this.hideTime);
    });
  }

  get message(): string {
    if (this.alertObject) return this.alertObject.message;
    else return '';
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.show ? 'is-active' : 'is-inactive');
    return classes;
  }

}
