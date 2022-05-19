import { 
  GlobalPositionStrategy, 
  Overlay, 
  OverlayConfig, 
  OverlayRef 
} from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, TemplatePortal } from '@angular/cdk/portal';
import { ComponentRef, Inject, Injectable, Injector, TemplateRef } from '@angular/core';
import { SbAlertBoxComponent } from './alert-box';
import { Color } from "../core";
import {
  SbAlertBoxConfig,
  SbAlertConfig,
  SB_ALERT_BOX_CONFIG_DEFAULT,
  SB_ALERT_CONFIG,
  SB_ALERT_CONFIG_DEFAULT,
  SB_ALERT_DATA
} from './alert-config';
import { SbAlertContainerComponent } from './alert-container';
import { SbAlertModule } from './alert.module';
import { SbAlertRef } from './alert-ref';

interface WaitingAlert {
  content: ComponentType<any> | TemplateRef<any>;
  config: Partial<SbAlertConfig>
}

@Injectable({ providedIn: SbAlertModule })
export class SbAlertService {

  private _currentAlertRef?: SbAlertRef;
  private _waiting: Array<WaitingAlert> = new Array();

  constructor(
    private _overlay: Overlay,
    private _injector: Injector,
    @Inject(SB_ALERT_BOX_CONFIG_DEFAULT)
    private _defaultAlertBoxConfig: SbAlertBoxConfig,
    @Inject(SB_ALERT_CONFIG_DEFAULT)
    private _defaultAlertContainerConfig: SbAlertConfig
  ) { }

  private _createPositionStrategy(config: SbAlertConfig): GlobalPositionStrategy {
    const positionStrategy = this._overlay.position().global();
    switch (config.side) {
      case 'left':
        positionStrategy.left('0');
        break;
      case 'right':
        positionStrategy.right('0');
        break;
      case 'top':
        positionStrategy.top('0');
        break;
      case 'bottom':
        positionStrategy.bottom('0');
        break;
    }

    switch (config.alignment) {
      case 'start':
        if (config.side == 'left' || config.side == 'right') {
          positionStrategy.top('0');
        } else if (config.side == 'top' || config.side == 'bottom') {
          positionStrategy.left('0');
        }
        break;
      case 'end':
        if (config.side == 'left' || config.side == 'right') {
          positionStrategy.bottom('0');
        } else if (config.side == 'top' || config.side == 'bottom') {
          positionStrategy.right('0');
        }
        break;
      case 'center':
        if (config.side == 'left' || config.side == 'right') {
          positionStrategy.centerVertically();
        } else if (config.side == 'top' || config.side == 'bottom') {
          positionStrategy.centerHorizontally();
        }
        break;
    }
    return positionStrategy;
  }

  private _createOverlay(config: SbAlertConfig): OverlayRef {
    const overlayConfig = new OverlayConfig();
    overlayConfig.positionStrategy = this._createPositionStrategy(config);
    overlayConfig.panelClass = 'sb-alert-overlay-pane';
    return this._overlay.create(overlayConfig);
  }

  private _attachAlertContainer(
    overlayRef: OverlayRef,
    config: SbAlertConfig
  ): SbAlertContainerComponent {
    const injector = Injector.create({
      parent: this._injector,
      providers: [{ provide: SB_ALERT_CONFIG, useValue: config }],
    });

    const containerPortal = new ComponentPortal(
      SbAlertContainerComponent,
      undefined,
      injector
    );
    const containerRef: ComponentRef<SbAlertContainerComponent> =
      overlayRef.attach(containerPortal);
    return containerRef.instance;
  }

  private _attach<T>(
    content: ComponentType<T> | TemplateRef<T>,
    userConfig?: Partial<SbAlertConfig>,
  ): any {
    
    const config: SbAlertConfig = {
      ...this._defaultAlertContainerConfig,
      ...userConfig
    };
    const overlayRef = this._createOverlay(config);
    const container = this._attachAlertContainer(overlayRef, config);

    if (content instanceof TemplateRef) {
      const portal = new TemplatePortal(content, null!, config.data);
      container.attach(portal);
    } else {
      const injector = Injector.create({
        parent: this._injector,
        providers: [{ provide: SB_ALERT_DATA, useValue: config.data }],
      });
      const portal = new ComponentPortal(content, undefined, injector);
      container.attach(portal);
    }

    this._currentAlertRef = new SbAlertRef(
      overlayRef,
      container,
      config
    );

    this._currentAlertRef.disposed.subscribe(() => this._consumeNextAlert())
    this._currentAlertRef.consume();
    return this._currentAlertRef;
  }

  private _queueAlert<T>(
    content: ComponentType<T> | TemplateRef<T>,
    config: Partial<SbAlertConfig> = {},
  ) {
    if (this._currentAlertRef) {
      this._waiting.push({
        content,
        config
      });
      this._currentAlertRef.dispose();
    } else {
      this._attach(content, config);
    }
  }

  private _consumeNextAlert(): void {
    this._currentAlertRef = undefined;
    let waiting = this._waiting.shift();
    if (waiting) {
      this._attach(waiting.content, waiting.config);
      if (this._waiting.length > 0) {
        this._currentAlertRef!.dispose();
      }
    }
  }

  public warn(
    message: string,
    alertBoxConfig: Partial<SbAlertBoxConfig> = {},
    alertConfig: Partial<SbAlertConfig> = {}
  ): void {
    alertBoxConfig.color = Color.WARN;
    this.alert(message, alertBoxConfig, alertConfig);
  }

  public success(
    message: string,
    alertBoxConfig: Partial<SbAlertBoxConfig> = {},
    alertConfig: Partial<SbAlertConfig> = {}
  ): void {
    alertBoxConfig.color = Color.SUCCESS;
    this.alert(message, alertBoxConfig, alertConfig);
  }

  public inform(
    message: string,
    alertBoxConfig: Partial<SbAlertBoxConfig> = {},
    alertConfig: Partial<SbAlertConfig> = {}
  ): void {
    alertBoxConfig.color = Color.INFO;
    this.alert(message, alertBoxConfig, alertConfig);
  }

  public primary(
    message: string,
    alertBoxConfig: Partial<SbAlertBoxConfig> = {},
    alertConfig: Partial<SbAlertConfig> = {}
  ): void {
    alertBoxConfig.color = Color.PRIMARY;
    this.alert(message, alertBoxConfig, alertConfig);
  }

  public secondary(
    message: string,
    alertBoxConfig: Partial<SbAlertBoxConfig> = {},
    alertConfig: Partial<SbAlertConfig> = {}
  ): void {
    alertBoxConfig.color = Color.SECONDARY;
    this.alert(message, alertBoxConfig, alertConfig);
  }

  public alert(
    message: string,
    alertBoxConfig: Partial<SbAlertBoxConfig> = {},
    alertConfig: Partial<SbAlertConfig> = {}
  ): void {
    const config: Partial<SbAlertConfig> = {
      ...alertConfig,
      data: {
        ...this._defaultAlertBoxConfig,
        ...alertBoxConfig,
        message
      }
    };
    this._queueAlert(SbAlertBoxComponent, config);
  }

  public alertFromTemplate(
    template: TemplateRef<any>,
    alertConfig: Partial<SbAlertConfig> = {}
  ): void {
    this._queueAlert(template, alertConfig); 
  }
}
