import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { SbProgressComponent } from "../../indicator";
import { Color, mixinClassName, mixinHide, mixinTheme, SbThemeService, Triggerable } from "../../../core";

const SbToastCore = mixinHide(
  mixinTheme(
    mixinClassName(
      class {
        constructor(
          public _elementRef: ElementRef,
          public _themeService: SbThemeService) {}
      }, 'sb-toast'
    )
  )
);

@Component({
  selector: 'sb-toast',
  templateUrl: './toast.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.timed]': 'timed > 0'
  },
  inputs: [
    'visible'
  ],
  outputs: [
    'show',
    'hide'
  ]
})
export class SbToastComponent extends SbToastCore implements Triggerable {

  @Output()
  public close: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  public color: string = Color.PRIMARY;

  @Input()
  public allowWithinClose: boolean = true;

  @Input()
  public timed: number = 0;

  @ViewChild(SbProgressComponent)
  public progressBar!: SbProgressComponent;

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService
  ) {
    super(elementRef, themeService);
    this.transitionElement = elementRef;
  }

  protected onShowEnd(): void {
    if (this.timed > 0) {
      this.progressBar.transition = `width ${this.timed}ms linear`;
      this.progressBar.progress = 100;
      this.wait(this.timed).then(() => this.setVisibleState(false))
    }
  }

  protected onHideEnd(): void {
    if (this.timed > 0) {
      this.progressBar.transition = '';
      this.progressBar.progress = 0;
    }
  }

  public handleClose(): void {
    this.close.emit();
    if (this.allowWithinClose) {
      this.setVisibleState(false);
    }
  }

  public trigger(): void {
    this.visible = !this.visible;
  }

}
