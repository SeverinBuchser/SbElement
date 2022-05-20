import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { hasElementRefClass, mixinClassName } from '../core';
import { SbCardContentComponent } from './card-content.component';
import { SbCardHeaderComponent } from './card-header.component';
import { SbCardImageComponent } from './card-image.component';

const SbCardCore = mixinClassName(hasElementRefClass, 'sb-card');

@Component({
  selector: 'sb-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
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

  @Input()
  public title?: string;

  @ViewChild(TemplateRef)
  public titleTemplate!: TemplateRef<any>;

  @ContentChild(SbCardHeaderComponent)
  public header?: SbCardHeaderComponent;

  @ContentChildren(SbCardImageComponent)
  public images!: QueryList<SbCardImageComponent>;;

  @ContentChildren(SbCardContentComponent)
  public contents!: QueryList<SbCardContentComponent>;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  private _hasHeader(): boolean {
    return this.header || this.title ? true : false;
  }

  public ngAfterContentInit(): void {

    if (this.images.length > 0) {
      if (!this._hasHeader()) {
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
    if (index > 0 || this.images.length <= 0 && this._hasHeader()) {
      return true;
    }
    return false;
  }

}
