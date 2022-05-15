import { CdkPortal } from '@angular/cdk/portal';
import {
  Component,
  ComponentRef,
  Input,
  NgZone,
  OnDestroy,
  ViewChild,
  ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs/operators';
import {
  SbOverlayService,
  Triggerable } from '../../core';
import { SbBarSide } from '../bar';
import { SbSidebarOverlayComponent } from './sidebar-overlay';

@Component({
  selector: 'sb-sidebar',
  templateUrl: './sidebar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SbSidebarComponent implements Triggerable, OnDestroy {

  @Input()
  public side: SbBarSide = 'left';

  @ViewChild(CdkPortal, { static: true })
  public overlayPortal!: CdkPortal;

  private _overlayOutletRef!: ComponentRef<SbSidebarOverlayComponent>;

  constructor(private _overlayService: SbOverlayService, public _ngZone: NgZone) {
    this._overlayOutletRef = this._overlayService.create(SbSidebarOverlayComponent);
    _ngZone.onStable.pipe(take(1)).subscribe(() => {
      this._overlayOutletRef.instance.attach(this.overlayPortal)
      this._overlayOutletRef.instance.side = this.side;
    })
  }

  public trigger(): void {
    this._overlayOutletRef.instance.trigger();
  }

  public ngOnDestroy(): void {
    this._overlayOutletRef.destroy();
  }
}
