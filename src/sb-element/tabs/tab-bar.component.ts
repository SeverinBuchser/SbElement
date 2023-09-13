import { ViewportRuler } from '@angular/cdk/scrolling';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { merge, Subject, Subscription } from 'rxjs';
import { auditTime, map, take, takeUntil } from 'rxjs/operators';

import { hasElementRefClass, mixinClassName, SbAlignDirective } from "../core";

import { SbTabLabelComponent } from './tab-label.component';

const SbTabBarCore = mixinClassName(hasElementRefClass, 'sb-tab-bar');

@Component({
  selector: 'sb-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SbTabBarComponent extends SbTabBarCore
  implements AfterContentInit, OnDestroy {

  @ContentChildren(SbTabLabelComponent)
  public labels!: QueryList<SbTabLabelComponent>;

  @ViewChild(SbAlignDirective, { static: true })
  public activeUnderlay!: SbAlignDirective;

  @Input()
  public activeLabel?: SbTabLabelComponent;

  private _deactivationSubscription?: Subscription;

  protected readonly _destroyed = new Subject<void>();

  constructor(
    elementRef: ElementRef,
    private _ngZone: NgZone,
    private _viewportRuler: ViewportRuler,
  ) {
    super(elementRef);
  }

  public ngAfterContentInit() {
    const activatedLabels = merge(...this.labels.map((label: SbTabLabelComponent) => {
      return label.activate.pipe(
        map(() => label),
        takeUntil(this._destroyed)
      )})
    );

    activatedLabels.subscribe((label: SbTabLabelComponent) => {
      if (label != this.activeLabel) {
        this._deactivationSubscription?.unsubscribe();
        this._deactivationSubscription = label.deactivate.subscribe(() => {
          this.activeLabel = undefined;
          this._deactivationSubscription?.unsubscribe();
          this.updateActiveUnderlay();
        })
        this.activeLabel?.setActive(false);
        this.activeLabel = label
      }
    });

    // directly from angular material
    this._ngZone.onStable.pipe(take(1)).subscribe(() => {
      this.updateActiveUnderlay();
    });
    merge(
      this._viewportRuler.change(150),
      this.labels.changes,
      activatedLabels.pipe(auditTime(150))
    )
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => {
        this._ngZone.run(() => {
          this.updateActiveUnderlay();
        });
      });
  }

  private updateActiveUnderlay(): void {
    if (this.activeLabel && this.activeLabel.isActive) {
      let tabBBox = this.activeLabel._elementRef.nativeElement.getBoundingClientRect();
      this.activeUnderlay.setWidth(tabBBox.width);
      this.activeUnderlay.moveBy(tabBBox.x - this.activeUnderlay.boundingClientRect.x, 0);
    }
  }

  public ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }


}
