import { Component, ContentChild, ElementRef, NgZone, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { SbButtonComponent } from '../../button';
import { mixinClassName, SbOverlayService, SbOverlayComponent } from '../../core';
import { SbSelectButtonListComponent } from './select-button-list';

const SbSelectButtonOverlayCore = mixinClassName(
  SbOverlayComponent,
  'sb-select-button-overlay'
);


@Component({
  selector: 'sb-select-button-overlay',
  templateUrl: './select-button-overlay.html',
  styleUrls: ['./select-button-overlay.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'visible'
  ],
  outputs: [
    'hide',
    'show'
  ]
})
export class SbSelectButtonOverlayComponent extends SbSelectButtonOverlayCore {

  @ContentChild(SbButtonComponent, {read: ElementRef})
  public button!: ElementRef;

  @ContentChild(SbSelectButtonListComponent)
  public list!: SbSelectButtonListComponent;

  constructor(
    elementRef: ElementRef,
    overlayService: SbOverlayService,
    viewContainerRef: ViewContainerRef
  ) {
    super(elementRef, overlayService, viewContainerRef);
  }

  public ngAfterContentInit(): void {
    this.list.showStart.subscribe(() => {
      this.attach();
      let buttonBBox = this.button.nativeElement.getBoundingClientRect();
      let listBBox = this.list._elementRef.nativeElement.getBoundingClientRect();

      buttonBBox.width = Math.max(listBBox.width, buttonBBox.width);
      this.button.nativeElement.style.minWidth = buttonBBox.width + 'px';
      this.list._elementRef.nativeElement.style.minWidth = buttonBBox.width + 'px';
      this._overlayOutletRef.instance.setBoundingBox(buttonBBox);
    })
    this.list.hideEnd.subscribe(() => {
      this._overlayOutletRef.instance.clear();
      this.detach();
    })
  }

}
