import { Attribute, Component, ElementRef, Input, Optional, ViewEncapsulation } from '@angular/core';
import { mixinSize, mixinColor, mixinClassName } from '../../core';

const SbAlertBoxCore = mixinSize(
  mixinColor(
    mixinClassName(
      class {
        constructor(public _elementRef: ElementRef) {}
      }, 'sb-alert-box'
    )
  )
);

@Component({
  selector: 'sb-alert-box',
  templateUrl: './alert-box.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.pill]': 'pill',
    '[class.plain]': 'plain',
    '[class.only-arrow]': 'arrow && !icon',
    '[class.only-icon]': '!arrow && icon',
    '[class.no-icon]': '!arrow && !icon',
  },
  inputs: [
    'size',
    'color'
  ]
})
export class SbAlertBoxComponent extends SbAlertBoxCore {

  @Input()
  public message: string = '';

  @Input()
  public arrow: boolean = true;

  @Input()
  public icon: boolean = true;

  @Input()
  public customIcon: boolean = false;

  private pill: boolean = false;
  private plain: boolean = false;

  constructor(
    elementRef: ElementRef,
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('plain') plain: any
  ) {
    super(elementRef);
    if (pill == '') this.pill = true;
    if (plain == '') this.plain = true;
  }

}
