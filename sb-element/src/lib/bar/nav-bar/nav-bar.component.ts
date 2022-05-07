import {
  Component,
  ContentChildren,
  ElementRef,
  QueryList,
  ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from "../../core";
import { SbContentPaginationDirective } from '../../paginator';
import { SbNavBarContentComponent } from './nav-bar-content';

const SbNavBarCore = mixinClassName(hasElementRefClass, 'sb-nav-bar');

@Component({
  selector: 'sb-nav-bar',
  templateUrl: './nav-bar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SbNavBarComponent extends SbNavBarCore {

  @ContentChildren(SbNavBarContentComponent)
  public contents!: QueryList<SbNavBarContentComponent>;

  // FIX
  // currently no able to pass ng content to other component
  @ContentChildren(SbContentPaginationDirective, { descendants: true })
  public paginations!: QueryList<SbContentPaginationDirective>;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
