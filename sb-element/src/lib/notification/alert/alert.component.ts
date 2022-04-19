import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { SbAlertOptions } from './alert';
import { mixinClassName, mixinHide, SbOverlayComponent } from '../../core';
import { SbAlertBoxComponent } from "../alert-box";

const SbAlertCore = mixinHide(
  mixinClassName(SbOverlayComponent, 'sb-alert')
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
export class SbAlertComponent extends SbAlertCore {

  @Input()
  public showTime: number = 2000;

  @Input()
  private pauseTime: number = 1000;

  @ViewChild(SbAlertBoxComponent, {static: true})
  private alertBox!: SbAlertBoxComponent;

  @ViewChild(SbAlertBoxComponent, {read: ElementRef})
  public transitionElement?: ElementRef;

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

  public async alert(alert: SbAlertOptions): Promise<void> {
    this.configureAlertBox(alert);
    this.setVisibleState(true);
    await this.wait(this.showTime);
    this.setVisibleState(false);
    await this.wait(this.pauseTime);
  }

  private configureAlertBox(alert: SbAlertOptions) {
    Object.assign(this.alertBox, alert);
    this.showTime = alert.showTime;
    this.pauseTime = alert.pauseTime;
  }

}
