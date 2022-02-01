import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Alert } from '../../models/alert/alert';
import { AlertServiceSubscriber } from '../../models/alert/alert-service-subscriber';
import { AlertService } from '../../services/alert/alert.service';
import { ThemeService } from '../../services/theme/theme.service';
import { SizeThemeColorInputDirective } from '../../core/style-input/size-theme-color-input.directive';

@Component({
  selector: 'sb-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent extends SizeThemeColorInputDirective implements AlertServiceSubscriber {

  public rootClass: string = 'sb-alert';

  @Input()
  public showArrow: boolean = true;

  @Input()
  public showIcon: boolean = true;

  public alertObject: Alert | null = null;
  public show: boolean = false;
  private appearTime: number = 300;
  @Input()
  public waitTime: number = 2000;
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
    .then(() => this.appears())
    .then(() => this.waits())
    .then(() => this.hides())
    .then(() => this.resetAlert())
  }

  private async setAlert(alert: Alert): Promise<void> {
    this.alertObject = alert;
    this.size = alert.size;
    this.color = alert.color;
    return Promise.resolve();
  }

  private async appears(): Promise<void> {
    await Promise.resolve(this.show = true);
    return await this.wait(this.appearTime);
  }

  private async waits(): Promise<void> {
    return this.wait(this.waitTime);
  }

  private async hides(): Promise<void> {
    await Promise.resolve(this.show = false);
    return await this.wait(this.hideTime);
  }

  private async wait(time: number): Promise<void> {
    return new Promise<void>(resolve => {
      setTimeout(() => resolve(), time);
    });
  }

  private async resetAlert(): Promise<void> {
    this.alertObject = null;
    return Promise.resolve();
  }

  get message(): string {
    if (this.alertObject) return this.alertObject.message;
    else return '';
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.show ? 'active' : 'inactive');
    return classes;
  }

}
