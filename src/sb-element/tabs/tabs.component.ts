import {
  Component,
  ContentChildren,
  ElementRef,
  Inject,
  Input,
  NgZone,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';

import { SbTabComponent } from './tab.component';
import { SbTabsCore } from './tabs-core';
import { SbSlideAnimationState, sbAnimations } from '../core/animation';
import { SbTabLabelComponent } from './tab-label.component';
import { take } from 'rxjs/operators';
import { SB_TABS_CONFIG, SbTabsModuleConfig } from './tabs.module.config';
import { Router } from '@angular/router';

@Component({
  selector: 'sb-tabs:not([routed])',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [sbAnimations.sbSlideAnimation]
})
export class SbTabsComponent extends SbTabsCore {

  @Input()
  public activeTabIndex: number = -1;

  @ContentChildren(SbTabComponent)
  public tabs!: QueryList<SbTabComponent>;

  @ViewChildren(SbTabLabelComponent)
  public tabLabels!: QueryList<SbTabLabelComponent>;

  public animationState: SbSlideAnimationState = 'isCenter';

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

  constructor(
    elementRef: ElementRef,
    @Inject(SB_TABS_CONFIG) config: SbTabsModuleConfig, 
    private _ngZone: NgZone,
    private _router: Router
  ) {
    super(elementRef);
    this.animationDuration = config.animationDuration;
    this._ngZone.onStable.pipe(take(1)).subscribe(() =>
    this.tabLabels.get(this.activeTabIndex)?.setActive(true))
  }

  public setActive(tabIndex: number): void {
    if (this.activeTabIndex >= 0) {
      this.animationState = this.activeTabIndex > tabIndex ? 'isLeft' : 'isRight';
    }
    this.activeTabIndex = tabIndex;
  }

}
