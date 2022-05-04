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

  @ViewChild('pagination', { static: true })
  public pagination!: ElementRef;

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

  public ngAfterContentChecked() {
    // let paginationElement = this.pagination.nativeElement;
    // this.scrollWidth = paginationElement.scrollWidth
    // this.visibleWidth = paginationElement.clientWidth;
    // this.maxScroll = this.scrollWidth - this.visibleWidth;
  }

  public handleScrollRight(): void {
    let paginationElement = this.pagination.nativeElement;
    if (paginationElement.scrollLeft < this.maxScroll) {

      let paginationBBox =  paginationElement.getBoundingClientRect();
      let nextElementBBox: DOMRect | undefined;
      this.someElements((element: Element) => {
        let elementBBox = element.getBoundingClientRect();

        let isCuttoff = paginationBBox.x + paginationBBox.width < elementBBox.x + elementBBox.width;
        if (isCuttoff) {
          nextElementBBox = elementBBox;
        }
        return isCuttoff;
      })
      if (nextElementBBox) {
        paginationElement.scrollTo({
          left: paginationElement.scrollLeft + nextElementBBox.x - paginationBBox.x,
          behavior: 'smooth'
        });
      }
    }
  }

  public handleScrollLeft(): void {
    let paginationElement = this.pagination.nativeElement;
    if (paginationElement.scrollLeft > 0) {

      let paginationBBox =  paginationElement.getBoundingClientRect();
      let nextElementBBox: DOMRect | undefined;
      this.someElements((element: Element) => {
        let elementBBox = element.getBoundingClientRect();

        let isNotCuttoff = paginationBBox.x < elementBBox.x + elementBBox.width;
        if (isNotCuttoff) {
          nextElementBBox = elementBBox;
        }
        return isNotCuttoff;
      });
      if (nextElementBBox) {
        paginationElement.scrollTo({
          left: paginationElement.scrollLeft + (nextElementBBox.x + nextElementBBox.width) - (paginationBBox.x + paginationBBox.width),
          behavior: 'smooth'
        });
      }
    }
  }

  public handleScroll(event: WheelEvent): void {
    let paginationElement = this.pagination.nativeElement;
    paginationElement.scrollTo({
      left: paginationElement.scrollLeft + event.deltaY,
      behavior: 'auto'
    });
    event.preventDefault();
  }

  private someElements(fn: (element: Element) => boolean): void {
    this.contents.some((content: SbNavBarContentComponent) => {
      let contentChildNodes: HTMLCollection = content._elementRef.nativeElement.children;
      return Array.from(contentChildNodes).some((element: Element) => {
        return fn(element);
      })
    })
  }

}
