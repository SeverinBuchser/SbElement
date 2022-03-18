import { Attribute, Component, ElementRef, Input, Optional, ViewEncapsulation } from '@angular/core';
import { mixinSize, mixinClassName, mixinColor } from '../../core';

const SbIconCore = mixinSize(
  mixinColor(
    mixinClassName(
      class {
        constructor(public _elementRef: ElementRef) {}
      }, 'sb-icon'
    )
  )
);


@Component({
  selector: 'sb-icon',
  templateUrl: './icon.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.outline]': 'outline'
  },
  inputs: [
    'size',
    'color'
  ]
})
export class SbIconComponent extends SbIconCore {

  @Input()
  public icon: string = '';

  @Input()
  set isOutline(isOutline: boolean) {
    this.outline = isOutline;
  }

  private outline: boolean = false;

  constructor(
    elementRef: ElementRef,
    @Optional() @Attribute('outline') outline: any
  ) {
    super(elementRef);
    if (outline == '') this.isOutline = true;
  }

}
