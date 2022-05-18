import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation } from '@angular/core';
import {
  Color,
  hasElementRefClass,
  mixinClassName,
  mixinHide,
  Triggerable } from "../../core";
import { SbProgressComponent } from "../../indicator";

const SbToastCore = mixinHide(mixinClassName(hasElementRefClass, 'sb-toast'));

@Component({
  selector: 'sb-toast',
  templateUrl: './toast.html',
  styleUrls: ['./toast.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.timed]': 'timed > 0'
  },
  inputs: [
    'visible'
  ],
  outputs: [
    'hide',
    'show'
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

  constructor(elementRef: ElementRef) {
    super(elementRef);
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
