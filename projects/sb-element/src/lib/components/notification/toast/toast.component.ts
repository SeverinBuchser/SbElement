import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { mixinClassName, mixinHide, mixinTheme, SbThemeService, Triggerable } from "../../../core";

const SbToastCore = mixinHide(
  mixinTheme(
    mixinClassName(
      class {
        constructor(
          public _elementRef: ElementRef,
          public _themeService: SbThemeService) {}
      }, 'sb-toast'
    )
  ), true
);

@Component({
  selector: 'sb-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'visible'
  ]
})
export class SbToastComponent extends SbToastCore implements Triggerable {

  @Output()
  public close: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  public allowWithinClose: boolean = true;

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService
  ) {
    super(elementRef, themeService);
    this.transitionElement = elementRef;
  }

  public handleClose(): void {
    this.close.emit();
    if (this.allowWithinClose) {
      this.visible = false;
    }
  }

  public trigger(): void {
    this.visible = !this.visible;
  }

}
