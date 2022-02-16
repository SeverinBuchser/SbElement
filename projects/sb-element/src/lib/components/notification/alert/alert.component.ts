import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { SbAlert } from './alert';
import { AlertServiceSubscriber } from './alert-service-subscriber';
import { SbAlertService } from './alert.service';
import { ThemeService, mixinSize, mixinColor, mixinTheme, mixinClassName } from '../../../core';

const SbAlertCore = mixinSize(
  mixinColor(
    mixinTheme(
      mixinClassName(
        class {
          constructor(
            public _elementRef: ElementRef,
            public _themeService: ThemeService) {}
        }, 'sb-alert'
      )
    )
  )
);

@Component({
  selector: 'sb-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.active]': 'show',
    '[class.inactive]': '!show'
  },
  inputs: [
    'size',
    'color'
  ]
})
export class SbAlertComponent extends SbAlertCore implements AlertServiceSubscriber {

  @Input()
  public showArrow: boolean = true;

  @Input()
  public showIcon: boolean = true;

  public alertObject: SbAlert | null = null;
  public show: boolean = false;
  private appearTime: number = 300;
  @Input()
  public waitTime: number = 2000;
  private hideTime: number = 1000;

  constructor(
    elementRef: ElementRef,
    themeService: ThemeService,
    private alertService: SbAlertService,
  ) {
    super(elementRef, themeService);
    this.alertService.subscribe(this);
  }

  public async alert(alert: SbAlert): Promise<void> {
    return this.setAlert(alert)
    .then(() => this.appears())
    .then(() => this.waits())
    .then(() => this.hides())
    .then(() => this.resetAlert())
  }

  private async setAlert(alert: SbAlert): Promise<void> {
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

}
