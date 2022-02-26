import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { SbAlert } from './alert';
import { AlertServiceSubscriber } from './alert-service-subscriber';
import { SbAlertService } from './alert.service';
import { SbThemeService, mixinClassName, mixinHide } from '../../core';
import { SbAlertBoxComponent } from "../alert-box";

const SbAlertCore = mixinHide(
  mixinClassName(
    class {
      constructor(
        public _elementRef: ElementRef,
        public _themeService: SbThemeService) {}
    }, 'sb-alert'
  )
);

@Component({
  selector: 'sb-alert',
  templateUrl: './alert.component.html',
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'visible'
  ],
  outputs: [
    'show',
    'hide'
  ]
})
export class SbAlertComponent extends SbAlertCore implements AlertServiceSubscriber {

  @Input()
  public showArrow: boolean = true;

  @Input()
  public showIcon: boolean = true;

  @Input()
  public showTime: number = 2000;

  @Input()
  private pauseTime: number = 1000;

  @ViewChild(SbAlertBoxComponent)
  private alertBox!: SbAlertBoxComponent;

  @ViewChild(SbAlertBoxComponent, {read: ElementRef})
  public transitionElement?: ElementRef;

  public message: string = '';

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService,
    private alertService: SbAlertService,
  ) {
    super(elementRef, themeService);
    this.alertService.subscribe(this);
  }

  public async alert(alert: SbAlert): Promise<void> {
    this.configureAlertBox(alert);
    this.message = alert.message;
    this.setVisibleState(true);
    await this.wait(this.showTime);
    this.setVisibleState(false);
    await this.wait(this.pauseTime);
  }

  private configureAlertBox(alert: SbAlert) {
    this.alertBox.size = alert.size;
    this.alertBox.color = alert.color;
  }

}
