import { Component, ElementRef, Input, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
import { SbBarComponent, SbBarSide } from '../../bar';
import {
  CanClassName,
  HasElementRef,
  mixinClassName,
  mixinHide,
  SbOverlayOutletComponent,
  Triggerable } from '../../../core';

const SbSidebarOverlayCore = mixinHide(
  mixinClassName(SbOverlayOutletComponent, 'sb-sidebar-overlay')
);

@Component({
  selector: 'sb-sidebar-overlay',
	templateUrl: './sidebar-overlay.component.html',
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'visible'
  ],
  outputs: [
    'hideEnd',
    'hideStart',
    'showEnd',
    'showStart'
  ]
})
export class SbSidebarOverlayComponent extends SbSidebarOverlayCore
  implements HasElementRef, CanClassName, Triggerable {

  @Input()
  public side: SbBarSide = 'left';

  @ViewChild(SbBarComponent, { read: ElementRef })
  public transitionElement!: ElementRef;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public trigger(): void {
    this.visible = !this.visible;
  }
}
