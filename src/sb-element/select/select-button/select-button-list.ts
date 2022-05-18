import { AnimationEvent } from '@angular/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import {
  Color,
  hasElementRefClass,
  mixinAccent,
  mixinClassName,
  mixinColor,
  mixinDisable,
  mixinPlain,
  mixinSize,
  mixinTabindex,
  sbAnimations,
  SbCollapseAnimationParams,
  SbCollapseAnimationState,
  SbConnectedSide,
  Size } from '../../core';

const SbSelectButtonListCore = mixinDisable(
  mixinTabindex(
    mixinAccent(
      mixinPlain(
        mixinSize(
          mixinColor(
            mixinClassName(hasElementRefClass, 'sb-select-button-list'),
            Color.PRIMARY
          ),
          Size.MEDIUM
        )
      )
    ),
    0
  )
);

@Component({
  selector: 'sb-select-button-list',
  templateUrl: './select-button-list.html',
  styleUrls: ['./select-button-list.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'isAccent: accent',
    'isPlain: plain',
    'size',
    'color',
    'disabled'
  ],
  animations: [sbAnimations.sbCollapseAnimation],
  host: {
    '[@collapseAnimation]': '{value: _animationState, params: _params}',
    '(@collapseAnimation.done)': '_onAnimationDone($event)'
  }
})
export class SbSelectButtonListComponent extends SbSelectButtonListCore {

  private _animationState: SbCollapseAnimationState = 'void';
  private _entrySide?: SbConnectedSide;
  protected _params: SbCollapseAnimationParams = {
    animationDuration: "100ms"
  }

  public afterClose: Subject<void> = new Subject();

  @Input()
  public options: Array<string> = new Array();

  @Output()
  public select: EventEmitter<string> = new EventEmitter();

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  open() {
    this._animationState = 'inital-open';
  }
  
  close() {
    this._animationState = 'collapsed';
  }

  public _onAnimationDone(event: AnimationEvent): void {
    if (this._animationState == 'collapsed') {
      this.afterClose.next();
    }
  }

}
