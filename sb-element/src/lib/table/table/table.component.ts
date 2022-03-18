import { Attribute, Component, ElementRef, HostBinding, Input, Optional, ViewEncapsulation } from '@angular/core';
import { mixinColor, mixinClassName } from '../../core';

const SbTableCore = mixinColor(
  mixinClassName(
    class {
      constructor(public _elementRef: ElementRef) {}
    }, 'sb-table'
  )
);

@Component({
  selector: 'sb-table',
  templateUrl: './table.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.plain]': 'plain'
  },
  inputs: [
    'size',
    'color'
  ]
})
export class SbTableComponent extends SbTableCore {

  @Input()
  set isPlain(isPlain: boolean) {
    this.plain = isPlain;
  }

  private plain: boolean = false;

  @Input() @HostBinding('class')
  public alignment: 'left' | 'center' | 'right' = 'center';

  @Input()
  public head: Array<any> = new Array<any>();

  @Input()
  public body: Array<Array<any>> = new Array<Array<any>>();

  constructor(
    elementRef: ElementRef,
    @Optional() @Attribute('plain') plain: any
  ) {
    super(elementRef);
    if (plain == '') this.isPlain = true;
  }

}
