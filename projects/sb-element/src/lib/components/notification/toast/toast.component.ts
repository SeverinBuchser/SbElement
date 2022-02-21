import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { mixinClassName, mixinFocus, mixinHide, mixinTheme, SbThemeService, Triggerable } from "../../../core";

const SbToastCore = mixinHide(
  mixinFocus(
    mixinTheme(
      mixinClassName(
        class {
          constructor(
            public _elementRef: ElementRef,
            public _themeService: SbThemeService) {}
        }, 'sb-toast'
      )
    )
  ), 200
);

@Component({
  selector: 'sb-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'visible'
  ],
  outputs: [
    'focus',
    'blur'
  ],
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
