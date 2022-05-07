import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation } from '@angular/core';
import {
  hasElementRefClass,
  mixinClassName,
  mixinHide,
  Size,
  Triggerable } from '../../core';
import { SbBarComponent, SbBarSide } from '../bar';

const SbSidebarCore = mixinHide(mixinClassName(hasElementRefClass, 'sb-sidebar'));

@Component({
  selector: 'sb-sidebar',
  templateUrl: './sidebar.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SbSidebarComponent extends SbSidebarCore implements Triggerable {

  @Input()
  public size: string = Size.MEDIUM;

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
