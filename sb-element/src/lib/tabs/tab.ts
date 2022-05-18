import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { SbTabsModuleConfig, SB_TABS_CONFIG } from './tabs.module.config';

export interface SbTabPositionChange {
  previous: number;
  current: number;
}

@Component({
  selector: 'sb-tab',
  templateUrl: './tab.html',
  encapsulation: ViewEncapsulation.None
})
export class SbTabComponent implements OnInit {

  @ViewChild(TemplateRef, { static: true })
  public _implicitContent!: TemplateRef<any>;

  @Input('label')
  public labelString: string = '';

  @Input('labelTemplate')
  public _explicitLabel?: TemplateRef<any>;

  @ViewChild('labelTemplate', { static: true })
  public _implicitLabel!: TemplateRef<any>;

  private _animationDuration: number = 0.3;
  @Input()
  set animationDuration(animationDuration: string) {
    let durationAndUnit = animationDuration.split(/(s|ms)/);
    let duration = parseFloat(durationAndUnit[0]);
    if (isNaN(duration)) {
      throw new Error(`The animation duration '${animationDuration}' is invalid!`);
    }
    if (durationAndUnit[1] == 'ms') {
      duration /= 1000;
    }
    this._animationDuration = duration;
  }
  get animationDuration(): string {
    return this._animationDuration + 's';
  }

  @Output()
  public positionChange: EventEmitter<SbTabPositionChange> = new EventEmitter();

  private _position: number = 0;
  set position(position: number) {
    if (this._position != position || position == 0) {
      let change = {
        previous: this._position,
        current: position
      }
      this._position = position;
      this.positionChange.emit(change);
    }
  }
  get position(): number {
    return this._position;
  }

  private _labelPortal?: TemplatePortal;
  get label(): TemplatePortal | undefined {
    return this._labelPortal;
  }

  private _contentPortal?: TemplatePortal;
  get content(): TemplatePortal | undefined {
    return this._contentPortal;
  }

  constructor(
    private _viewContainerRef: ViewContainerRef,
    @Inject(SB_TABS_CONFIG) config: SbTabsModuleConfig
  ) {
    this.animationDuration = config.animationDuration;
  }

  ngOnInit(): void {
    this._labelPortal = new TemplatePortal(
      this._explicitLabel || this._implicitLabel,
      this._viewContainerRef
    )

    this._contentPortal = new TemplatePortal(
     this._implicitContent,
     this._viewContainerRef,
   );
  }

}
