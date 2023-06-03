import { ViewportRuler } from '@angular/cdk/scrolling';
import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { hasElementRefClass, mixinClassName } from '../core';

import { SbContentPaginationDirective } from './content-pagination.directive';

const SbContentPaginatorCore = mixinClassName(hasElementRefClass, 'sb-content-paginator');

@Component({
  selector: 'sb-content-paginator',
  templateUrl: './content-paginator.component.html',
  styleUrls: ['./content-paginator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SbContentPaginatorComponent extends SbContentPaginatorCore
  implements AfterContentInit, OnDestroy {

  @ViewChild('paginator', { static: true })
  public paginator!: ElementRef;

  @Input()// @ContentChildren(SbContentPaginationDirective, { descendants: true })
  public paginations!: QueryList<SbContentPaginationDirective>;

  get maxScroll(): number {
    let paginatiorElement = this.paginator.nativeElement;
    return paginatiorElement.scrollWidth - paginatiorElement.clientWidth;
  }


  protected readonly _destroyed = new Subject<void>();
  public showPaginationControls = true;

  constructor(
    elementRef: ElementRef,
    private _ngZone: NgZone,
    private _viewportRuler: ViewportRuler,
  ) {
    super(elementRef);
  }

  public ngAfterContentInit() {
    // directly from angular material
    this._ngZone.onStable.pipe(take(1)).subscribe(() => {
      this.updatePagination();
    });
    merge(this._viewportRuler.change(150), this.paginations.changes)
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => {
        this._ngZone.run(() => {
          this.updatePagination();
        });
      });
  }

  private updatePagination(): void {
    let paginatiorElement = this.paginator.nativeElement;
    this.showPaginationControls = paginatiorElement.scrollWidth > paginatiorElement.clientWidth && this.paginations.length > 0;
  }

  public handleScrollRight(): void {
    let paginatiorElement = this.paginator.nativeElement;
    if (paginatiorElement.scrollLeft < this.maxScroll) {

      let paginatorBBox =  paginatiorElement.getBoundingClientRect();
      let nextPaginationBBox: DOMRect | undefined;
      this.findPagination((pagination: HTMLElement) => {
        let elementBBox = pagination.getBoundingClientRect();
        let elementRight = elementBBox.x + elementBBox.width;
        let paginatorRight = paginatorBBox.x + paginatorBBox.width;

        let isCuttoff = paginatorRight < elementRight;
        if (isCuttoff) {
          nextPaginationBBox = elementBBox;
        }
        return isCuttoff;
      })
      if (nextPaginationBBox) {
        this.scroll(
          nextPaginationBBox.x - paginatorBBox.x,
          'smooth'
        );
      }
    }
  }

  public handleScrollLeft(): void {
    let paginatiorElement = this.paginator.nativeElement;
    if (paginatiorElement.scrollLeft > 0) {

      let paginatorBBox =  paginatiorElement.getBoundingClientRect();
      let nextPaginationBBox: DOMRect | undefined;
      this.findPagination((pagination: HTMLElement) => {
        let elementBBox = pagination.getBoundingClientRect();
        let elementRight = elementBBox.x + elementBBox.width;
        let paginatorLeft = paginatorBBox.x;

        let isCuttoff = paginatorLeft < elementRight;
        if (isCuttoff) {
          nextPaginationBBox = elementBBox;
        }
        return isCuttoff;
      });
      if (nextPaginationBBox) {
        this.scroll(
          (nextPaginationBBox.x + nextPaginationBBox.width) - (paginatorBBox.x + paginatorBBox.width),
          'smooth'
        );
      }
    }
  }

  public handleScroll(event: WheelEvent): void {
    this.scroll(event.deltaY, 'auto');
    event.preventDefault();
  }

  private scroll(delta: number, behavior: 'smooth' | 'auto'): void {
    let paginatiorElement = this.paginator.nativeElement;
    paginatiorElement.scrollTo({
      left: paginatiorElement.scrollLeft + delta,
      behavior
    });
  }

  private findPagination(fn: (element: HTMLElement) => boolean): SbContentPaginationDirective | undefined {
    return this.paginations.find((content: SbContentPaginationDirective) => {
      return fn(content._elementRef.nativeElement);
    })
  }

  public ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
