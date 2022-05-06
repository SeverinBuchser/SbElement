import { Component, ContentChildren, ElementRef, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { SbNavBarContentComponent } from './nav-bar-content';
import { mixinClassName } from "../../core";
import { SbContentPaginationDirective } from '../../paginator';

const SbNavBarCore = mixinClassName(
  class {
    constructor(public _elementRef: ElementRef) {}
  }, 'sb-nav-bar'
);

@Component({
  selector: 'sb-nav-bar',
  templateUrl: './nav-bar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SbNavBarComponent extends SbNavBarCore {

  @ContentChildren(SbNavBarContentComponent)
  public contents!: QueryList<SbNavBarContentComponent>;

  private scrollWidth!: number;
  private visibleWidth!: number;
  private maxScroll!: number;

  // FIX
  // currently no able to pass ng content to other component
  @ContentChildren(SbContentPaginationDirective, { descendants: true })
  public paginations!: QueryList<SbContentPaginationDirective>;

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }

}
