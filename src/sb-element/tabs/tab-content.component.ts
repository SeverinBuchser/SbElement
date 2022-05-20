import { CdkPortalOutlet } from '@angular/cdk/portal';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {
  hasElementRefClass,
  mixinClassName,
  sbAnimations,
  SbSlideAnimationState
} from "../core";

import { SbTabComponent, SbTabPositionChange } from './tab.component';

const SbTabContentCore = mixinClassName(hasElementRefClass, 'sb-tab-content');

@Component({
  selector: 'sb-tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [sbAnimations.sbSlideAnimation]
})
export class SbTabContentComponent extends SbTabContentCore implements OnInit {

  @ViewChild(CdkPortalOutlet)
  public contentHost!: CdkPortalOutlet;

  @Input()
  public tab!: SbTabComponent;

  public animationState: SbSlideAnimationState = 'void';

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public ngOnInit(): void {
    this.tab.positionChange.subscribe((change: SbTabPositionChange) => {
      this.animationState = this.getNextAnimationState(change);
      if (this.isCenterState(this.animationState)) {
        if (!this.contentHost.hasAttached()) {
          this.contentHost.attach(this.tab.content);
        }
      }
    })
  }

  public onAnimationDone(): void {
    if (this.animationState == 'left' || this.animationState == 'right') {
      this.contentHost.detach();
    }
  }

  private getNextAnimationState(
    positionChange: SbTabPositionChange
  ): SbSlideAnimationState {
    if (this.animationState == 'void') {
      if (positionChange.current == positionChange.previous) {
        return 'center';
      } else if (positionChange.current == 0) {
        return positionChange.previous > 0 ? 'inital-center-left' : 'inital-center-right';
      }
    } else if (positionChange.current == 0) {
      return 'center';
    } else if (this.isCenterState(this.animationState)) {
      return positionChange.current < 0 ? 'left' : 'right';
    }
    return 'void';
  }

  private isCenterState(animationState: SbSlideAnimationState): boolean {
    return animationState == 'center'
        || animationState == 'inital-center-left'
        || animationState == 'inital-center-right';
  }

}
