import {
  Component,
  ComponentRef,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from '../../common-behaviors';
import { SbOverlayOutletComponent } from '../overlay-outlet';
import { SbOverlayService } from '../overlay.service';

const SbOverlayCore = mixinClassName(hasElementRefClass, 'sb-overlay');

@Component({
  selector: 'sb-overlay',
  templateUrl: './overlay.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SbOverlayComponent extends SbOverlayCore implements OnInit, OnDestroy {

  @ViewChild('overlayTemplate', { static: true })
  public overlayTemplate!: TemplateRef<any>;

  protected overlayOutletRef!: ComponentRef<SbOverlayOutletComponent>;

  constructor(
    elementRef: ElementRef,
    protected overlayService: SbOverlayService
  ) {
    super(elementRef);
  }

  public ngOnInit() {
    this.overlayOutletRef = this.overlayService.create(SbOverlayOutletComponent);
    this.overlayOutletRef.instance.createEmbeddedView(this.overlayTemplate);
  }

  public ngOnDestroy(): void {
    this.overlayOutletRef.destroy();
  }

}
