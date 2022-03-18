import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { mixinSize, mixinClassName, Size } from "../../core";


const SbLinkCore = mixinSize(
  mixinClassName(
    class {
      constructor(public _elementRef: ElementRef) {}
    }, 'sb-link'
  ), Size.MEDIUM
);

@Component({
  selector: 'sb-link',
  templateUrl: './link.component.html',
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

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

}
