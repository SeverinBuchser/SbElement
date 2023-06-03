import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName, mixinSize, Size } from '../core';

const SbLinkCore = mixinSize(
  mixinClassName(hasElementRefClass, 'sb-link'),
  Size.MEDIUM
);

@Component({
  selector: 'sb-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.active]': 'active'
  },
  inputs: [
    'size'
  ]
})
export class SbLinkComponent extends SbLinkCore {

  @Input()
  public active: boolean = false;

  @Input()
  public href: string = '';

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
