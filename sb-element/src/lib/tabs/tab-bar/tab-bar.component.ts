import { AfterContentInit, Component, ContentChildren, ElementRef, NgZone, OnDestroy, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { auditTime, filter, map, take, takeUntil } from 'rxjs/operators';
import { merge, Subject } from 'rxjs';
import { SbTabLabelComponent } from '../tab-label';
import { mixinClassName, SbAlignDirective } from "../../core";

const SbTabBarCore = mixinClassName(
  class {
    constructor(public _elementRef: ElementRef) {}
  }, 'sb-tab-bar'
);


@Component({
  selector: 'sb-tab-bar',
  templateUrl: './tab-bar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SbTabBarComponent extends SbTabBarCore implements AfterContentInit, OnDestroy {

  @ContentChildren(SbTabLabelComponent)
  public labels!: QueryList<SbTabLabelComponent>;

  @ViewChild(SbAlignDirective, { static: true })
  public activeUnderlay!: SbAlignDirective;

  private activeLabel?: SbTabLabelComponent;

  protected readonly _destroyed = new Subject<void>();

  constructor(
    elementRef: ElementRef,
    private _ngZone: NgZone,
    private _viewportRuler: ViewportRuler,
  ) {
    super(elementRef);
  }

  public ngAfterContentInit() {
    const activeChange = merge(...this.labels.map((tab: SbTabLabelComponent) => tab.isActiveChange.pipe(
      filter((isActive: boolean) => isActive),
      map(() => tab),
      takeUntil(this._destroyed)
    )))
    activeChange.subscribe((tab: SbTabLabelComponent) => this.activeLabel = tab);

    // directly from angular material
    this._ngZone.onStable.pipe(take(1)).subscribe(() => {
      this.updateActiveUnderlay();
    });
    merge(this._viewportRuler.change(150), this.labels.changes, activeChange.pipe(auditTime(150)))
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
