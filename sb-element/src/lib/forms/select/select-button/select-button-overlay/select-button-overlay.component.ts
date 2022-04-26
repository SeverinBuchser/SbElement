import { Component, ContentChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { SbButtonComponent } from '../../../button';
import { mixinClassName, SbOverlayService, SbOverlayComponent } from '../../../../core/';
import { SbSelectButtonListComponent } from '../select-button-list';

const SbSelectButtonOverlayCore = mixinClassName(
  SbOverlayComponent, 'sb-select-button-overlay'
);


@Component({
  selector: 'sb-select-button-overlay',
  templateUrl: './select-button-overlay.component.html',
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'visible'
  ],
  outputs: [
    'show',
    'hide'
  ]
})
export class SbSelectButtonOverlayComponent extends SbSelectButtonOverlayCore {

  @ContentChild(SbButtonComponent, {read: ElementRef})
  public button!: ElementRef;

  @ContentChild(SbSelectButtonListComponent)
  public list!: SbSelectButtonListComponent;

  constructor(
    elementRef: ElementRef,
    overlayService: SbOverlayService
  ) {
    super(elementRef, overlayService);
  }

  public ngAfterContentInit(): void {
    this.list.showStart.subscribe(() => {
      let contentBBox = this.button.nativeElement.getBoundingClientRect();
      this.overlayOutletRef.instance.setBoundingBox(contentBBox);
    })
    this.list.hideEnd.subscribe(() => {
      this.overlayOutletRef.instance.clear();
    })
  }

}
