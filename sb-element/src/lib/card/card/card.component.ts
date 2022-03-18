import { Attribute, Component, ElementRef, Input, Optional, ViewEncapsulation } from '@angular/core';
import { mixinClassName, mixinSize, Size } from '../../core';

const SbCardCore = mixinSize(
  mixinClassName(
    class {
      constructor(public _elementRef: ElementRef) {}
    }, 'sb-card'
  ), Size.MEDIUM
);

@Component({
  selector: 'sb-card',
  templateUrl: './card.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.hover]': 'hover',
    '[class.shadow]': 'shadow'
  },
  inputs: [
    'size'
  ]
})
export class SbCardComponent extends SbCardCore {

  @Input()
  public titleSeparator: boolean = true;

  @Input()
  public footerSeprator: boolean = true;

  private hover: boolean = false;
  private shadow: boolean = false;

  constructor(
    elementRef: ElementRef,
    @Optional() @Attribute('hover') hover: any,
    @Optional() @Attribute('shadow') shadow: any
  ) {
    super(elementRef);
    if (hover == '') this.hover = true;
    if (shadow == '') this.shadow = true;
  }

}
