import { AfterContentInit, Attribute, Component, ContentChild, ContentChildren, ElementRef, Input, Optional, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { SbCardHeaderComponent } from '../card-header';
import { SbCardImageDirective } from '../card-image';
import { SbCardContentComponent } from '../card-content';
import { mixinClassName } from '../../core';

const SbCardCore = mixinClassName(
  class {
    constructor(public _elementRef: ElementRef) {}
  }, 'sb-card'
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
export class SbCardComponent extends SbCardCore implements AfterContentInit {

  @Input()
  public titleSeparator: boolean = true;

  @Input()
  public footerSeprator: boolean = true;

  @ContentChild(SbCardHeaderComponent)
  public header?: SbCardHeaderComponent;

  @ContentChildren(SbCardImageDirective)
  public images!: QueryList<SbCardImageDirective>;;

  @ContentChildren(SbCardContentComponent)
  public contents!: QueryList<SbCardContentComponent>;

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


  public ngAfterContentInit(): void {

    if (this.images.length > 0) {
      if (!this.header) {
        this.images.first.borderTop = false;
      }
      if (this.contents.length == 0) {
        this.images.last.borderBottom = false;
      }
    }

    this.images.forEach((image: SbCardImageDirective, index: number) => {
      if (index > 0) image.borderTop = false;
    })
  }

  public showContentTopRule(index: number): boolean {
    if (index > 0 || this.images.length <= 0 && this.header) {
      return true;
    }
    return false;
  }

}
