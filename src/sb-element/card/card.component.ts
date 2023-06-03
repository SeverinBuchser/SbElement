import {
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
import { SbCardContentDirective } from './card-content.directive';
import { SbCardHeaderComponent } from './card-header.component';

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
export class SbCardComponent extends SbCardCore {

  @Input()
  public showHeaderSeparator: boolean = true;

  @Input()
  public title?: string;

  @ViewChild(TemplateRef)
  public titleTemplate!: TemplateRef<any>;

  @ContentChild(SbCardHeaderComponent)
  public header?: SbCardHeaderComponent;

  @ContentChildren(SbCardContentDirective)
  public contents!: QueryList<SbCardContentDirective>;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  private _hasHeader(): boolean {
    return this.header || this.title ? true : false;
  }

  public showContentTopRule(index: number): boolean {
    if (index > 0 || this._hasHeader() && this.showHeaderSeparator) {
      return true;
    }
    return false;
  }

}
