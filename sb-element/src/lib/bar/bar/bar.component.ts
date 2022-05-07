import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName, mixinColor } from '../../core';

export type SbBarSide = 'left' | 'right' | 'top' | 'bottom';

const SbBarCore = mixinColor(mixinClassName(hasElementRefClass, 'sb-bar'));

@Component({
  selector: 'sb-bar',
  templateUrl: './bar.component.html',
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'size',
    'color'
  ]
})
export class SbBarComponent extends SbBarCore {

  @Input() @HostBinding('class')
  public side: SbBarSide = 'left';

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
