import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { SbProgressComponent } from "../../indicator";
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
  )
);

@Component({
  selector: 'sb-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
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
  public allowWithinClose: boolean = true;

  @Input()
  public timed: number = 0;

  @ViewChild(SbProgressComponent, {read: ElementRef})
  public progressBar!: ElementRef;

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService
  ) {
    super(elementRef, themeService);
    this.transitionElement = elementRef;
  }

  protected onShowEnd(): void {
    if (this.timed > 0) {
      let progressBarChild = this.progressBar.nativeElement.firstChild;
      progressBarChild.style.transition = `width ${this.timed}ms linear`;
      progressBarChild.style.width = '100%';
      this.wait(this.timed).then(() => this.setVisibleState(false))
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
