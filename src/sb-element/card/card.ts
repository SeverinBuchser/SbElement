import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { hasElementRefClass, mixinClassName } from '../core';
import { SbCardContentComponent } from './card-content';
import { SbCardHeaderComponent } from './card-header';
import { SbCardImageComponent } from './card-image';

const SbCardCore = mixinClassName(hasElementRefClass, 'sb-card');

@Component({
  selector: 'sb-card',
  templateUrl: './card.html',
  styleUrls: ['./card.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.hover]': 'hover',
    '[class.shadow]': 'shadow'
  }
})
export class SbCardComponent extends SbCardCore implements AfterContentInit {

  @Input()
  public titleSeparator: boolean = true;

  @Input()
  public footerSeprator: boolean = true;

  @ContentChild(SbCardHeaderComponent)
  public header?: SbCardHeaderComponent;

  @ContentChildren(SbCardImageComponent)
  public images!: QueryList<SbCardImageComponent>;;

  @ContentChildren(SbCardContentComponent)
  public contents!: QueryList<SbCardContentComponent>;

  constructor(elementRef: ElementRef) {
    super(elementRef);
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

    this.images.forEach((image: SbCardImageComponent, index: number) => {
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
