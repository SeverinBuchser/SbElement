import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  OnDestroy,
  ViewEncapsulation } from '@angular/core';
import {
  mixinClassName,
  Poppable,
  SbOverlayService,
  SbOverlayComponent } from '../../core/';
import { SbPopperContentComponent } from '../popper-content';
import { SbPopperOverlayComponent } from '../popper-overlay';

const SbPopperCore = mixinClassName(
  SbOverlayComponent, 'sb-popper'
);

@Component({
  selector: 'sb-popper',
  templateUrl: './popper.component.html',
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'visible'
  ],
  outputs: [
    'hide',
    'show'
  ]
})
export class SbPopperComponent extends SbPopperCore
  implements Poppable, AfterContentInit, OnDestroy {

  @ContentChild(SbPopperContentComponent, {read: ElementRef})
  public content!: ElementRef;

  @ContentChild(SbPopperOverlayComponent)
  public popperOverlay!: SbPopperOverlayComponent;

  constructor(
    elementRef: ElementRef,
    overlayService: SbOverlayService
  ) {
    super(elementRef, overlayService);
  }

  public trigger(): void {
    this.popperOverlay.trigger();
  }

  public ngAfterContentInit(): void {
    this.popperOverlay.showStart.subscribe(() => {
      let contentBBox = this.content.nativeElement.getBoundingClientRect();
      this.overlayOutletRef.instance.setBoundingBox(contentBBox);
      this.popperOverlay.alignRelative(contentBBox);
    })
    this.popperOverlay.hideEnd.subscribe(() => {
      this.overlayOutletRef.instance.clear();
      this.popperOverlay.clear();
    })
  }

  public getPopperRef(): ElementRef<any> {
    return this.popperOverlay._elementRef;
  }

  public isPopped(): boolean {
    return this.popperOverlay.visible;
  }

}
