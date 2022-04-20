import { Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { mixinClassName, mixinColor } from '../../core';

const SbBarCore = mixinColor(
  mixinClassName(
    class {
      constructor(public _elementRef: ElementRef) {}
    }, 'sb-bar'
  )
);


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
  public side: 'left' | 'right' | 'top' | 'bottom' = 'left';

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }
}
